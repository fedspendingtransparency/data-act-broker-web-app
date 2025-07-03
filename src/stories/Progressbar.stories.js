import { MemoryRouter } from "react-router";

import ProgressBar from '../js/components/SharedComponents/ProgressBar';

export default {
    title: 'ProgressBar',
    component: ProgressBar,
    decorators: [
        (Story) => (
            <MemoryRouter><Story /></MemoryRouter>
        )
    ]
};

export const Primary = {
    args: {
        progress: 60,
        animate: true,
        action: "loading",
        fileName: "file",
        decimalPlaces: 1
    },
};
