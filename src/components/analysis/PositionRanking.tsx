/**
 * Виджет «Позиция на Kaspi» — мини-рейтинг продавцов внутри картинки телефона.
 * Магазин пользователя анимированно поднимается на 1-е место.
 */
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { Star } from "lucide-react";
import kaspiLogo from "../../assets/Logo_of_Kaspi_bank.png";
import { useTranslation } from "react-i18next";
import { formatMoney } from "../../lib/utils";
import { MiniSellerRankingRenderItem } from "../../lib/miniSellerRanking";
import sellersBg from "../../assets/sellers-bg.png";
import { RANKING_PAUSE_AT_BOTTOM_MS, RANKING_SHUFFLE_INTERVAL_MS } from "../../constants/app";
import { styles, EASE_STANDARD, animations } from "./PositionRanking.styles";

interface PositionRankingProps {
  renderList: MiniSellerRankingRenderItem[];
}

function pluralizeReviews(count: number, lang: string): string {
  if (lang === 'en') return count === 1 ? 'review' : 'reviews';
  if (lang === 'kk') return 'пікір';
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return 'отзыв';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'отзыва';
  return 'отзывов';
}

const AnimatedPrice: React.FC<{ value: number; reduceMotion: boolean }> = ({
  value,
  reduceMotion,
}) => {
  const motionValue = useMotionValue(value);
  const formatted = useTransform(motionValue, (latest) =>
    formatMoney(Math.round(latest)),
  );

  useEffect(() => {
    if (reduceMotion) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, animations.priceTween);
    return controls.stop;
  }, [motionValue, reduceMotion, value]);

  return <motion.span>{formatted}</motion.span>;
};

function useAnimatedRanking(renderList: MiniSellerRankingRenderItem[]) {
  const [isPromoted, setIsPromoted] = useState(false);
  const [shuffledOthers, setShuffledOthers] = useState<MiniSellerRankingRenderItem[] | null>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const shuffleRef = useRef<number | undefined>(undefined);

  const userItem = useMemo(
    () => renderList.find((i) => i.type === "user"),
    [renderList],
  );
  const leaderPrice = useMemo(() => {
    const topItems = renderList.filter((i) => i.type === "top");
    if (topItems.length === 0) return 0;
    return Math.min(...topItems.map((i) => i.price));
  }, [renderList]);

  const isAlreadyFirst = useMemo(() => {
    if (!userItem) return false;
    return userItem.price <= leaderPrice || leaderPrice === 0;
  }, [userItem, leaderPrice]);

  const baseOthers = useMemo(
    () => renderList.filter((i) => i.type !== "user"),
    [renderList],
  );

  // Shuffle: swap two random competitors every N seconds
  useEffect(() => {
    if (baseOthers.length < 2) return;

    const tick = () => {
      setShuffledOthers((prev) => {
        const list = [...(prev ?? baseOthers)];
        const a = Math.floor(Math.random() * list.length);
        let b = Math.floor(Math.random() * (list.length - 1));
        if (b >= a) b++;
        [list[a], list[b]] = [list[b], list[a]];
        return list;
      });
    };

    shuffleRef.current = window.setInterval(tick, RANKING_SHUFFLE_INTERVAL_MS);
    return () => clearInterval(shuffleRef.current);
  }, [baseOthers]);

  const animatedList = useMemo(() => {
    const others = shuffledOthers ?? baseOthers;

    if (!userItem) return others;

    if (isPromoted && !isAlreadyFirst) {
      const promotedPrice = leaderPrice - 1;
      const promotedUser: MiniSellerRankingRenderItem = {
        ...userItem,
        price: promotedPrice,
      };
      return [promotedUser, ...others];
    }

    // Insert user at their original position among others
    const userIndex = renderList.indexOf(userItem);
    const result = [...others];
    result.splice(Math.min(userIndex, result.length), 0, userItem);
    return result;
  }, [renderList, userItem, isPromoted, isAlreadyFirst, leaderPrice, baseOthers, shuffledOthers]);

  useEffect(() => {
    if (!userItem || isAlreadyFirst || isPromoted) return;
    timerRef.current = window.setTimeout(() => {
      setIsPromoted(true);
    }, RANKING_PAUSE_AT_BOTTOM_MS);
    return () => clearTimeout(timerRef.current);
  }, [userItem, isAlreadyFirst, isPromoted]);

  return animatedList;
}

const PositionRanking: React.FC<PositionRankingProps> = ({ renderList }) => {
  const { t, i18n } = useTranslation();
  const reduceMotion = useReducedMotion();
  const animatedList = useAnimatedRanking(renderList);

  return (
    <div className={styles.root}>
      <div className={styles.headerRow}>
        <div className={styles.logoWrap}>
          <img src={kaspiLogo} alt="Kaspi" className={styles.logoImg} />
        </div>
        <div>
          <p className={styles.kicker}>
            {t("analysis.ranking.kicker")}
          </p>
          <h3 className={styles.title}>
            {t("analysis.ranking.title")}
          </h3>
        </div>
      </div>

      <div className={styles.phoneWrap}>
        <img
          src={sellersBg}
          alt=""
          className={styles.phoneBg}
          draggable={false}
        />
        <div className={styles.overlay}>
          <div
            className={styles.listContainer}
            style={styles.listContainerPadding}
          >
            <motion.div
              layout={!reduceMotion}
              className={styles.listScroll}
            >
              <AnimatePresence initial={false} mode="popLayout">
                {animatedList.map((item) => {
                  const itemKey = item.uniqueId;
                  return (
                    <motion.div
                      layout={reduceMotion ? false : "position"}
                      layoutId={reduceMotion ? undefined : `seller-${itemKey}`}
                      key={itemKey}
                      initial={reduceMotion ? false : animations.sellerItem.initial}
                      animate={reduceMotion ? undefined : animations.sellerItem.animate}
                      exit={reduceMotion ? undefined : animations.sellerItem.exit}
                      transition={
                        reduceMotion ? undefined : animations.layoutTransition
                      }
                      className={styles.sellerRow(item.isHighlighted)}
                    >
                      {/* Row 1: Name + Select button */}
                      <div className={styles.sellerNameRow}>
                        <div className={styles.sellerNameWrap}>
                          <p className={styles.sellerName(item.isHighlighted)}>
                            {item.title}
                          </p>
                          {item.subtitle?.length ? (
                            <p className={styles.sellerSubtitle}>
                              {item.subtitle}
                            </p>
                          ) : null}
                        </div>
                        <span className={styles.selectBtn}>
                          {t("analysis.ranking.select")}
                        </span>
                      </div>

                      {/* Row 2: Rating + review count + Price */}
                      <div className={styles.metaRow}>
                        <div className={styles.metaLeft}>
                          {item.rating !== null && (
                            <span className={styles.ratingBadge}>
                              {item.rating.toFixed(1)}
                              <Star size={8} className={styles.starIcon} />
                            </span>
                          )}
                          {item.reviewCount !== null && (
                            <span className={styles.reviewCount}>
                              {item.reviewCount} {pluralizeReviews(item.reviewCount, i18n.language)}
                            </span>
                          )}
                        </div>
                        <p className={styles.price(item.isHighlighted)}>
                          {reduceMotion ? (
                            formatMoney(item.price)
                          ) : (
                            <AnimatedPrice
                              value={item.price}
                              reduceMotion={reduceMotion}
                            />
                          )}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionRanking;
