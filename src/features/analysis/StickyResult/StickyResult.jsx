import { cn } from '@/shared/lib/utils';
import s from './StickyResult.module.css';

export default function StickyResult({
  storeName,
  rank,
  price,
  leaderName,
  leaderPrice,
  isLeader,
  visible,
}) {
  /* Если наш магазин — лидер (#1), показываем один большой блок */
  if (isLeader) {
    return (
      <div className={cn(s.root, visible && s.rootVisible)}>
        <div className={s.inner}>
          <p className={s.sectionLabel}>Результаты анализа</p>
          <div className={s.soloBlock}>
            <div className={s.rankBadge}>#{rank ?? '—'}</div>
            <div className={s.soloInfo}>
              <p className={s.storeName}>{storeName || '—'}</p>
              <div className={s.soloMeta}>
                <span className={s.metaItem}>Позиция: #{rank ?? '—'}</span>
                <span className={s.metaDot} />
                <span className={s.metaItem}>{price || '—'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Два блока: слева наш магазин, справа лидер */
  return (
    <div className={cn(s.root, visible && s.rootVisible)}>
      <div className={s.inner}>
        <p className={s.sectionLabel}>Результаты анализа</p>
        <div className={s.columns}>
          {/* Наш магазин */}
          <div className={s.column}>
            <div className={s.columnHeader}>
              <div className={s.rankBadge}>#{rank ?? '—'}</div>
              <p className={s.storeName}>{storeName || '—'}</p>
            </div>
            <div className={s.columnMeta}>
              <span className={s.metaItem}>Позиция: #{rank ?? '—'}</span>
              <span className={s.metaDot} />
              <span className={s.metaItem}>{price || '—'}</span>
            </div>
          </div>

          <div className={s.divider} />

          {/* Лидер */}
          <div className={s.column}>
            <div className={s.columnHeader}>
              <div className={cn(s.rankBadge, s.rankBadgeLeader)}>#1</div>
              <p className={s.storeName}>{leaderName || '—'}</p>
            </div>
            <div className={s.columnMeta}>
              <span className={s.metaItem}>Позиция: #1</span>
              <span className={s.metaDot} />
              <span className={s.metaItem}>{leaderPrice || '—'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
