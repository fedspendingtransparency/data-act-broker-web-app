/**
  * ValidateLoadingScreen.jsx
  * Created by Kevin Li 04/13/16
  */

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ValidateDataFilePlaceholder from './ValidateDataFilePlaceholder';

import CommonOverlay from '../SharedComponents/overlays/CommonOverlay';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble';

const ValidateLoadingScreen = () => {
    const placeholders = [];

    for (let i = 0; i < 3; i++) {
        placeholders.push(<ValidateDataFilePlaceholder key={i} />);
    }

    return (
        <div className="container">
            <div className="row center-block usa-da-submission-items with-overlay">
                <div className="usa-da-validate-items">
                    <TransitionGroup>
                        <CSSTransition
                            classNames="usa-da-validate-fade"
                            timeout={500}
                            exit>
                            <div>
                                {placeholders}
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            </div>
            <CommonOverlay
                header="Gathering data..."
                icon={<LoadingBauble />}
                iconClass="overlay-animation"
                showButtons={false} />
        </div>
    );
};

export default ValidateLoadingScreen;
