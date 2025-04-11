"use client";

import ListGridSwitchButton from "@/app/SharedComponents/ListGridSwitchButton";
import { setUserSettingsValue, useLocalStorageValues } from "@/infrastructure/tools/LocalStorage";

const ProductViewSwitchButton = () => {
  const { showProductGrid } = useLocalStorageValues('showProductGrid');
  if (showProductGrid === undefined) return null;

  const toggleShowGrid = () => {
    setUserSettingsValue('showProductGrid', !showProductGrid);
  };

  return <ListGridSwitchButton size={48} checked={showProductGrid} onClick={toggleShowGrid} />;
};

export default ProductViewSwitchButton;
