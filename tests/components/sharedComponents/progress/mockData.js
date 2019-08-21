import { stepNames, classes } from 'dataMapping/dabs/progress';

export const mockProps = {
    currentStep: 1,
    totalSteps: 5,
    stepNames,
    setStep: jest.fn(() => null),
    barClasses: classes
};
