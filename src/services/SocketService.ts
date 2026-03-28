import PubNub from 'pubnub';
import React from 'react';

const PUBNUB_SUBSCRIBE_KEY = import.meta.env.VITE_APP_PUBNUB_SUBSCRIBE_KEY;
console.log('PUBNUB_SUBSCRIBE_KEY', PUBNUB_SUBSCRIBE_KEY);
export default interface BaseModel {
    id: string;
    typename: string;
    eventStatus: null | string;
    eventResult: null | string;
    updatedBy: null | string;
    revisionId: number;
    updatedAt: string;
    createdAt: string;
}

export default class Sockets {
    private _userId: string;
    private _updateModelAttributes: any;
    private _pubnub: PubNub;
    private _eventDelegate: ((data: BaseModel) => void) | undefined;

    static instance: any;

    constructor(userId: string, updateModelAttributes: any) {
        this._userId = userId;
        this._updateModelAttributes = updateModelAttributes;
        this._pubnub = new PubNub({
            // TODO: later move this to env.*
            subscribeKey: PUBNUB_SUBSCRIBE_KEY,
            userId: this._userId,
            logVerbosity: false
        });
        // Subscribe channel dedicated to a user.
        this._pubnub.subscribe({
            channels: [this._userId]
        });
        // Add listener.
        console.log(`[Sockets]: Connecting user ${this._userId}...`, PUBNUB_SUBSCRIBE_KEY);
        this._pubnub.addListener({
            status: (statusEvent: any) => {
                if (statusEvent.category === 'PNConnectedCategory') {
                    console.log('[Sockets] Connected');
                }
            },
            message: (messageEvent: any) => {
                let updatedModelAttributes = undefined;
                try {
                    updatedModelAttributes = messageEvent.message;
                } catch (error) {
                    console.error('Incorrect <JSON> model:', messageEvent.message);
                }
                console.log('Sockets::message::model', updatedModelAttributes);

                console.log(updatedModelAttributes.status);
                if (updatedModelAttributes.status === 'suspend') {
                    localStorage.removeItem('sessionid');
                    location.reload();
                }

                // Expected that every model attributes has at least id and typename to
                // identify a model and all the attributes shall be updated.
                if (updatedModelAttributes && updatedModelAttributes.id && updatedModelAttributes.typename && this._updateModelAttributes) {
                    //console.log('UPDATE MODEL', updatedModelAttributes);
                    // You can test the flow from pubsub debug console sending model JSON.
                    // {"createdAt":"2023-06-21T08:14:04.783Z", "typename":"user", "id":"02a81077-7565-425d-86de-b667e2895899"}
                    this._updateModelAttributes(updatedModelAttributes);
                    if (this._eventDelegate && ['tote', 'sportevent', 'stream'].includes(updatedModelAttributes.typename)) {
                        this._eventDelegate(updatedModelAttributes as BaseModel);
                    }
                }
            },
            presence: (presenceEvent: any) => {
                console.log('Sockets::presence', presenceEvent);
            }
        });
    }

    /**
     * Unsubscribe socket from all the channels.
     */
    unsubscribe(channels: null | Array<string> = null) {
        if (!channels) {
            this._pubnub.unsubscribeAll();
        } else {
            this._pubnub.unsubscribe({ channels });
        }
    }

    subscribeEventId(eventId: string, eventDelegate: (data: BaseModel) => void) {
        // Subscribe channel dedicated to a user.
        this._pubnub.subscribe({
            channels: [this._userId, eventId]
        });
        this._eventDelegate = eventDelegate;
    }

    static getCurrentSocket() {
        return this.instance;
    }

    /**
     * Create an singleton to handle sockets for a user.
     * @param {string} userId
     */
    static setSocketForUser(userId: string, setModelFunction: any) {
        console.log('Sockets::setSocketForUser', userId);
        if (!this.instance) {
            this.instance = new Sockets(userId, setModelFunction);
            console.log(this.instance);
        }

        return this.instance;
    }
}
