import classNames from 'classnames';
import React from "react";

export default function Button(props){
  let {children, className, ...btnProps} = props;

  const btnClassName = classNames(
    "f6 pointer no-underline grow dib v-mid bg-red white ba br1 b--red ph3 pv2 mb3",
    className
  )

  return (
    <button className={btnClassName} {...btnProps}>
      { children }
    </button>
  )
}

