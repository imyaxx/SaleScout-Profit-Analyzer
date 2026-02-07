import React, {
  useCallback,
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
import { Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn, formatMoney } from "../../lib/utils";
import { MiniSellerRankingRenderItem } from "../../lib/miniSellerRanking";
import sellersBg from "../../assets/sellers-bg.png";

interface PositionRankingProps {
  renderList: MiniSellerRankingRenderItem[];
}

const layoutEase: [number, number, number, number] = [0.4, 0, 0.2, 1];
const priceEase: [number, number, number, number] = [0.4, 0, 0.2, 1];

const PAUSE_AT_BOTTOM = 2000;
const PAUSE_AT_TOP = 3000;

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
    const controls = animate(motionValue, value, {
      type: "tween",
      duration: 1.0,
      ease: [0.4, 0, 0.2, 1],
    });
    return controls.stop;
  }, [motionValue, reduceMotion, value]);

  return <motion.span>{formatted}</motion.span>;
};

function useAnimatedRanking(renderList: MiniSellerRankingRenderItem[]) {
  const [isPromoted, setIsPromoted] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

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

  const animatedList = useMemo(() => {
    if (!userItem || !isPromoted || isAlreadyFirst) return renderList;

    const promotedPrice = leaderPrice - 1;
    const promotedUser: MiniSellerRankingRenderItem = {
      ...userItem,
      price: promotedPrice,
    };

    const others = renderList.filter((i) => i.type !== "user");
    return [promotedUser, ...others];
  }, [renderList, userItem, isPromoted, isAlreadyFirst, leaderPrice]);

  const startCycle = useCallback(() => {
    clearTimeout(timerRef.current);

    setIsPromoted(false);
    timerRef.current = window.setTimeout(() => {
      setIsPromoted(true);
      timerRef.current = window.setTimeout(() => {
        startCycle();
      }, PAUSE_AT_TOP);
    }, PAUSE_AT_BOTTOM);
  }, []);

  useEffect(() => {
    if (!userItem || isAlreadyFirst) return;
    startCycle();
    return () => clearTimeout(timerRef.current);
  }, [userItem, isAlreadyFirst, startCycle]);

  return animatedList;
}

const PositionRanking: React.FC<PositionRankingProps> = ({ renderList }) => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const animatedList = useAnimatedRanking(renderList);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-4 sm:p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <p className="text-xs uppercase font-semibold text-gray-400">
            {t("analysis.ranking.kicker")}
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-1 drop-shadow-sm">
            {t("analysis.ranking.title")}
          </h3>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
          <Award size={18} />
        </div>
      </div>

      <div className="relative mx-auto max-w-[280px]">
        {/* Phone background image */}
        <img
          src={sellersBg}
          alt=""
          className="w-full h-auto select-none pointer-events-none"
          draggable={false}
        />
        {/* Seller list overlay positioned inside the phone screen area */}
        <div className="absolute inset-0">
          <div
            className="w-full overflow-hidden flex flex-col"
            style={{
              paddingTop: "58%",
              paddingBottom: "14%",
              paddingLeft: "8%",
              paddingRight: "8%",
            }}
          >
            <motion.div
              layout={!reduceMotion}
              className="space-y-2 overflow-y-auto flex-1"
              style={{ scrollbarWidth: "none" }}
            >
              <AnimatePresence initial={false} mode="popLayout">
                {animatedList.map((item) => {
                  const itemKey = item.uniqueId;
                  return (
                    <motion.div
                      layout={reduceMotion ? false : "position"}
                      layoutId={reduceMotion ? undefined : `seller-${itemKey}`}
                      key={itemKey}
                      initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: 4 }}
                      transition={
                        reduceMotion
                          ? undefined
                          : {
                              layout: {
                                type: "tween",
                                duration: 1.2,
                                ease: layoutEase,
                              },
                              opacity: { duration: 0.5, ease: priceEase },
                              y: { duration: 0.5, ease: priceEase },
                            }
                      }
                      className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-xl border",
                        item.isHighlighted
                          ? "border-blue-200 bg-blue-50/80"
                          : "border-gray-100 bg-white/90",
                      )}
                    >
                      <div className="min-w-0">
                        <p
                          className={cn(
                            "text-xs font-semibold truncate",
                            item.isHighlighted
                              ? "text-blue-700"
                              : "text-gray-900",
                          )}
                        >
                          {item.title}
                        </p>
                        {item.subtitle?.length ? (
                          <p className="text-[10px] text-blue-500 truncate">
                            {item.subtitle}
                          </p>
                        ) : null}
                      </div>
                      <p
                        className={cn(
                          "text-xs font-semibold whitespace-nowrap ml-1",
                          item.isHighlighted
                            ? "text-blue-700"
                            : "text-gray-600",
                        )}
                      >
                        {reduceMotion ? (
                          formatMoney(item.price)
                        ) : (
                          <AnimatedPrice
                            value={item.price}
                            reduceMotion={reduceMotion}
                          />
                        )}
                      </p>
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
