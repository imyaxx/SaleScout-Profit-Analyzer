/**
 * Прогресс-бар визарда — 4 шага: Приветствие → Данные → Анализ → Заявка.
 * Показывает текущий шаг синим, пройденные — зелёным.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { styles } from './StepProgress.styles';

interface StepProgressProps {
  current: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ current }) => {
  const { t } = useTranslation();
  const steps = [
    { id: 1, label: t('steps.welcome') },
    { id: 2, label: t('steps.data') },
    { id: 3, label: t('steps.analysis') },
    { id: 4, label: t('steps.lead') }
  ];

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.row}>
          {steps.map((step, idx) => {
            const isCompleted = current > step.id;
            const isActive = current === step.id;
            return (
              <React.Fragment key={step.id}>
                <div className={styles.stepGroup}>
                  <div className={styles.circle(isCompleted, isActive)}>
                    {step.id}
                  </div>
                  <span className={styles.label(isCompleted, isActive)}>
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={styles.connectorWrap}>
                    <div className={styles.connector(isCompleted)} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepProgress;
