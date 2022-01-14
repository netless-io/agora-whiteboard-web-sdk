import type { CommonProps, GenericIcon } from "../../types";

import clsx from "clsx";

import { Icon } from "../../icons";
import { ChevronLeft } from "../../icons/ChevronLeft";
import { ChevronRight } from "../../icons/ChevronRight";
import { FilePlus } from "../../icons/FilePlus";
import { TopOffset } from "../../theme";
import { useWritable } from "../hooks";
import { Tippy } from "../Tippy";
import { usePageControl } from "./hooks";

export const name = "fastboard-page-control";

export type PageControlProps = CommonProps &
  GenericIcon<"add" | "prev" | "next">;

export function PageControl({
  room,
  manager,
  theme = "light",
  addIcon,
  addIconDisable,
  prevIcon,
  prevIconDisable,
  nextIcon,
  nextIconDisable,
  i18n,
}: PageControlProps) {
  const writable = useWritable(room);
  const { pageIndex, pageCount, ...actions } = usePageControl(room, manager);

  const disabled = !writable;

  return (
    <div className={clsx(name, theme)}>
      {/* <span className={clsx(`${name}-cut-line`, theme)} />{" "} */}
      <Tippy
        className="fastboard-tip"
        content={i18n?.t("prevPage")}
        theme={theme}
        disabled={disabled}
        placement="top"
        delay={[1000, 400]}
        duration={300}
        offset={TopOffset}
      >
        <button
          className={clsx(`${name}-btn`, "prev", theme)}
          disabled={disabled || pageIndex === 0}
          onClick={actions.prevPage}
        >
          <Icon
            fallback={<ChevronLeft theme={theme} />}
            src={disabled ? prevIconDisable : prevIcon}
            alt="[prev]"
          />
        </button>
      </Tippy>
      <span className={clsx(`${name}-page`, theme)}>
        {pageCount === 0 ? "\u2026" : pageIndex + 1}
      </span>
      <span className={clsx(`${name}-slash`, theme)}>/</span>
      <span className={clsx(`${name}-page-count`, theme)}>{pageCount}</span>
      <Tippy
        className="fastboard-tip"
        content={i18n?.t("nextPage")}
        theme={theme}
        disabled={disabled}
        placement="top"
        delay={[1000, 400]}
        duration={300}
        offset={TopOffset}
      >
        <button
          className={clsx(`${name}-btn`, "next", theme)}
          disabled={disabled || pageIndex === pageCount - 1}
          onClick={actions.nextPage}
        >
          <Icon
            fallback={<ChevronRight theme={theme} />}
            src={disabled ? nextIconDisable : nextIcon}
            alt="[next]"
          />
        </button>
      </Tippy>
      <Tippy
        className="fastboard-tip"
        content={i18n?.t("addPage")}
        theme={theme}
        disabled={disabled}
        placement="top"
        delay={[1000, 400]}
        duration={300}
        offset={TopOffset}
      >
        <button
          className={clsx(`${name}-btn`, "add", theme)}
          disabled={disabled}
          onClick={actions.addPage}
        >
          <Icon
            fallback={<FilePlus theme={theme} />}
            src={disabled ? addIconDisable : addIcon}
            alt="[add]"
          />
        </button>
      </Tippy>
    </div>
  );
}
