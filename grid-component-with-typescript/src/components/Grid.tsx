import * as React from "react";

import styles from "./Grid.module.css";

type GridItemsAlignment =
  | "flex-start"
  | "center"
  | "flex-end"
  | "stretch"
  | "baseline";

type GridJustify =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";

type GridSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface GridProps {
  alignItems?: GridItemsAlignment;
  column?: boolean;
  expanded?: boolean;
  justify?: GridJustify;
  lg?: GridSizes;
  md?: GridSizes;
  row?: boolean;
  sm?: GridSizes;
}

const Grid: React.SFC<GridProps> = (props) => {
  const {
    alignItems,
    children,
    column,
    expanded,
    justify,
    lg,
    md,
    row,
    sm
  } = props;

  const isRow: boolean = row || !column;

  const classes: string =
    (!isRow ? styles.column : styles.row) +
    // Row styling
    (isRow && expanded ? ` ${styles.expanded}` : "") +
    (isRow && justify ? ` ${styles[justify]}` : "") +
    (isRow && alignItems ? ` ${styles["align-" + alignItems]}` : "") +
    // Column styling
    (!isRow && sm ? ` ${styles["sm-" + sm]}` : "") +
    (!isRow && md ? ` ${styles["md-" + md]}` : "") +
    (!isRow && lg ? ` ${styles["lg-" + lg]}` : "");

  return <div className={classes}>{children}</div>;
};

export default Grid;
