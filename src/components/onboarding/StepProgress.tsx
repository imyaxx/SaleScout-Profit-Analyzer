import React from 'react';
import { cn } from '../../lib/utils';

interface StepProgressProps {
  current: number;
}

const steps = [
  { id: 1, label: 'Приветствие' },
  { id: 2, label: 'Данные' },
  { id: 3, label: 'Анализ' },
  { id: 4, label: 'Заявка' }
];

const StepProgress: React.FC<StepProgressProps> = ({ current }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-16 md:top-20 z-40">
      <div className="max-w-[1280px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => {
            const isCompleted = current > step.id;
            const isActive = current === step.id;
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border',
                      isCompleted && 'bg-green-500 border-green-500 text-white',
                      isActive && 'bg-blue-600 border-blue-600 text-white',
                      !isCompleted && !isActive && 'bg-white border-gray-200 text-gray-400'
                    )}
                  >
                    {step.id}
                  </div>
                  <span
                    className={cn(
                      'text-sm font-semibold hidden sm:inline',
                      isCompleted && 'text-green-600',
                      isActive && 'text-gray-900',
                      !isCompleted && !isActive && 'text-gray-400'
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="flex-1 mx-3">
                    <div
                      className={cn(
                        'h-[2px] w-full',
                        current > step.id ? 'bg-green-500' : 'bg-gray-200'
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepProgress;
