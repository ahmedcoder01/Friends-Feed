import React, { FC, useState } from "react";
import NotFound from "../pages/NotFound/NotFound";
import { Tab } from "../types";

interface Props {
  tabs: Tab[];
  defaultIndex: number;
  notFoundComponent?: React.ReactNode;
}

interface UseTabs {
  CurrentTab: React.ReactNode;
  changeTab: (index: number) => void;
}

const UseTabs = ({ tabs, defaultIndex, notFoundComponent }: Props): UseTabs => {
  const [index, setIndex] = useState(defaultIndex);
  let CurrentTab = tabs[index]?.Component || notFoundComponent;

  function changeTab(index: number) {
    setIndex(index);
  }

  return { CurrentTab, changeTab };
};

export default UseTabs;

// put in another file
