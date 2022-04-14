/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-04-14 12:05:52
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-14 17:48:27
 */
import { FC, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const useTeleport = () => {
  const content: {
    value: Element | null;
    disable: boolean;
    set: ((element: Element | null) => void) | null;
  } = {
    value: null,
    disable: false,
    set: null,
  };

  function setElement(element: any) {
    content.value = element;
    if (content.set) {
      content.set(element);
    }
  }

  const Target: FC = ({ children }) => {
    return (
      <div className="ss" ref={setElement}>
        {children}
      </div>
    );
  };

  const Source: FC<{ disable: boolean }> = ({ disable, children }) => {
    content.disable = disable;
    const [element, setElement] = useState<Element | null>(null);
    useLayoutEffect(() => {
      setElement(content.value);
      content.set = setElement;
    }, []);
    if (content.disable) {
      return <>{children}</>;
    } else {
      if (!element) return null;
      return ReactDOM.createPortal(children, element);
    }
  };
  return {
    Source,
    Target,
  };
};

export default useTeleport;
