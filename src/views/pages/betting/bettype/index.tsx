import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'clsx';

import { CloseIconSvg } from 'assets/svg';
import Button from '@mui/material/Button';

interface ChildProps {
    betTypePopup: string;
    closePopup: any;
}

const BetTypeText = (props: ChildProps) => {
    const closePopup = () => {
        props.closePopup();
    };

    return (
        <div>
            <div></div>
            <div>
                <Button
                    type="button"
                    className={classnames(classnames, 'close')}
                    onClick={closePopup}
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">
                        <CloseIconSvg />
                    </span>
                </Button>
                {props.betTypePopup === 'betExplanation' && (
                    <>
                        <div>Bet Types Explanations</div>
                        <div className="termsview">
                            <div className="bettypetext">
                                <div className="termsandcondition">
                                    <h6>Below are brief explanations of various types of bets in horse racing:</h6>
                                    <div className="">
                                        <ul>
                                            <li>Win:</li>
                                            <p>
                                                You bet on a horse to finish first in the race. If your chosen horse wins, you win the bet.
                                            </p>
                                            <li>Place:</li>
                                            <p>
                                                You bet on a horse to finish in either first, second or third place. If your chosen horse
                                                comes in first, second or third, you win the bet.
                                            </p>
                                            <li>SHP (Second Horse Pool):</li>
                                            <p>
                                                You pick a horse to finish in the second position in the race. If your selected horse comes
                                                in second, you win the bet.
                                            </p>
                                            <li>THP (Third Horse Pool):</li>
                                            <p>
                                                You predict which horse will finish in the third position in the race. If your chosen horse
                                                finishes third, you win the bet.
                                            </p>
                                            <li>Show:</li>
                                            <p>
                                                You bet on a horse to finish in the top three positions (first, second, or third). If your
                                                selected horse finishes in any of these positions, you win the bet.
                                            </p>
                                            <li>Quinella:</li>
                                            <p>
                                                You choose two horses to finish in the top two positions, regardless of the order. If your
                                                chosen horses finish first and second, you win the bet.
                                            </p>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {props.betTypePopup === 'howToBet' && (
                    <>
                        <div>How To Bet</div>
                        <div className="termsview">
                            <div className="bettypetext">
                                <div className="termsandcondition">
                                    <h6>Below are brief explanations of various types of bets in horse racing:</h6>
                                    <div className=""></div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {props.betTypePopup === 'depositWithdraw' && (
                    <>
                        <div>Deposit and withdraw</div>
                        <div className="termsview">
                            <div className="bettypetext">
                                <div className="termsandcondition">
                                    <h6>Below are brief explanations of various types of bets in horse racing:</h6>
                                    <div className=""></div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div className="nomargin">
                    <div>
                        <Link to="/faqs">View all ‘FAQs & Help’</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BetTypeText;
