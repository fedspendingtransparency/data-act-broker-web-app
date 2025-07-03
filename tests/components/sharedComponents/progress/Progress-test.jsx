/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router";

import Progress from 'components/SharedComponents/Progress';
import { mockProps } from './mockData';

test('The first step should have current classname', async () => {
    render(<Progress {...mockProps} />);
    const stepElement = screen.getByText('1');
    expect(stepElement.parentElement.parentElement).toHaveClass(mockProps.barClasses.current);
});

test('Subsequent steps should have step classname', async () => {
    render(<Progress {...mockProps} />);
    for (let step = 2; step <= mockProps.totalSteps; step++) {
        const stepElement = screen.getByText(String(step));
        expect(stepElement.parentElement.parentElement).toHaveClass(mockProps.barClasses.step);
    }
});

test('Steps before the current step should have the done classname', async () => {
    const currentStep = 3;
    const newProps = { ...mockProps, currentStep };
    render(<MemoryRouter><Progress {...newProps} /></MemoryRouter>);
    for (let step = 1; step < currentStep; step++) {
        const stepElement = screen.getByText(String(step));
        expect(stepElement.parentElement.parentElement).toHaveClass(mockProps.barClasses.done);
    }
});

test('All buttons should be disabled', async () => {
    const newProps = { ...mockProps};
    render(<Progress {...newProps} />);
    for (let step = 1; step <= mockProps.totalSteps; step++) {
        const stepElement = screen.getByText(String(step));
        expect(stepElement).toBeDisabled();
    }
});

test('Buttons before the current step should not be disabled', async () => {
    const currentStep = 4;
    const newProps = { ...mockProps, currentStep };
    render(<MemoryRouter><Progress {...newProps} /></MemoryRouter>);
    for (let step = 1; step < currentStep; step++) {
        const stepElement = screen.getByText(String(step));
        expect(stepElement).not.toBeDisabled();
    }
});
