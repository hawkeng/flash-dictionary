import React from 'react';
import './Dismissable.css';

class Dismissable extends React.Component {
    state = {}
    initialTouch = null
    dismissDistance = 150

    constructor(props) {
        super(props);

        this.dismissDistance = props.distance || this.dismissDistance;
    }

    handleTouchStart = (event) => {
        this.initialTouch = event.changedTouches[0];
    }

    handleTouchMove = (event) => {
        const touch = event.changedTouches[0];
        if (this.initialTouch.identifier === touch.identifier) {
            const distance = touch.pageX - this.initialTouch.pageX;
            this.setState({
                style: {
                    transform: `translateX(${distance}px)`,
                    opacity: `${1 - (distance / 120)}`
                }
            });
        }
    }

    handleTouchEnd = (event) => {
        const touch = event.changedTouches[0];
        if (this.initialTouch.identifier === touch.identifier) {
            const distance = touch.pageX - this.initialTouch.pageX;

            if (distance >= this.dismissDistance) {
                this.props.onDismiss();
            } else {
                this.setState({
                    style: {
                        transform: 'translateX(0)',
                        opacity: 1
                    }
                });
            }

            this.initialTouch = null;
        }
    }

    render() {
        return (
            <div 
                style={this.state.style}
                className='dismissable'
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}>
                {this.props.children}
            </div>
        );
    }
}

export default Dismissable;