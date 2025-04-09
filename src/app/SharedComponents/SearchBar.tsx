"use client";

import classNames from "classnames";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import Button from "./Button";
import { SearchButtonOffIcon, SearchButtonOnIcon } from "./Icons";
import './SearchBar.scss';

const TextInput = dynamic(() => import("./TextInput"), { ssr: false });

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showSearchField, setShowSearchField] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = searchParams.get('q') || '';
    }
    if (searchParams.get('q')) {
      setShowSearchField(true);
    }
  }, []);

  const debounced = useDebouncedCallback(({ target }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!target.value) {
      params.delete('q');
    } else {
      params.set('q', target.value);
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 350);

  const onClick = () => {
    setShowSearchField(!showSearchField);
  };

  return (
    <search className={classNames("SearchBarMainContainer", showSearchField && "SearchBarMainContainerOn")}>
      <TextInput showClearButton name='q' onChange={debounced} ref={inputRef} />
      <Button onClick={onClick} title={'Search'}>
        {showSearchField
          ? <SearchButtonOnIcon width={48} height={48} />
          : <SearchButtonOffIcon width={48} height={48} />
        }
      </Button>
    </search>
  );
};

export default SearchBar;
