import { stepNames, classes } from 'dataMapping/dabs/progress';

export const mockProps = {
    id: 'test',
    currentStep: 1,
    totalSteps: 5,
    stepNames,
    setStep: jest.fn(() => null),
    barClasses: classes
};
