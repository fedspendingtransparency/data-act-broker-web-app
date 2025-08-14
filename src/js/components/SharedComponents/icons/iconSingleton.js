/**
  * IconSingleton.js
  * Created by Kevin Li 7/19/16
  */

import Axios from 'axios';
import { XmlDocument } from 'xmldoc';

require('../../../../graphics/icons.svg');
const { v4: uuidv4 } = require('uuid');

class IconSingleton {
    constructor() {
        this.subscribers = {};
        this.svgCache = {};
        this.svgLoaded = false;
        this.svgRequested = false;
    }

    downloadIcons() {
        this.svgRequested = true;
        Axios.get('/graphics/icons.svg')
            .then((res) => {
                // parse the response
                this.parseSvg(res.data);

                // mark the SVG as loaded
                this.svgLoaded = true;

                // notify any other icon components that the SVG data is ready
                this.notifySubscribers('usa-da-icons.loaded');
            });
    }

    parseSvg(rawSvg) {
        // downloaded raw SVG data, send it through an XML parser
        const data = new XmlDocument(rawSvg);

        // iterate through each symbol and extract the symbol's content XML as a string and also its viewbox attribute
        data.childrenNamed('symbol').forEach((symbol) => {
            let childData = '';
            symbol.eachChild((child) => {
                childData += child.toString();
            });

            // save all this data into the svg data singleton
            this.svgCache[symbol.attr.id] = {
                data: childData,
                viewBox: symbol.attr.viewBox
            };
        });
    }

    notifySubscribers(event) {
        // iterate through subscribers to notify them that icons are ready
        for (const subscriptionId in this.subscribers) {
            if (Object.prototype.hasOwnProperty.call(this.subscribers, subscriptionId)) {
                const subscriber = this.subscribers[subscriptionId];
                subscriber(event);
            }
        }
    }

    subscribe(subscriber) {
        // add a subscriber and return a UUID as a subscription ID so they can later unsubscribe
        const subscriptionId = uuidv4();
        this.subscribers[subscriptionId] = subscriber;
        return subscriptionId;
    }

    unsubscribe(subscriptionId) {
        // unsubscribe the observer
        delete this.subscribers[subscriptionId];
    }
}

const instance = new IconSingleton();
export default instance;
