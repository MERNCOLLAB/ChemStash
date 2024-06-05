import { useState, useRef } from 'react';

const useSubSup = (onChange) => {
  const [showButton, setShowButton] = useState(false);
  const pRef = useRef(null);

  const handleFocus = () => {
    setShowButton(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!pRef.current.contains(document.activeElement)) {
        setShowButton(false);
        if (pRef.current) {
          onChange({ target: { id: 'molecularFormula', value: pRef.current.innerHTML } });
        }
      }
    }, 0);
  };

  const isFormatActive = (tag) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      let container = selection.getRangeAt(0).commonAncestorContainer;
      while (container) {
        if (container.nodeName.toLowerCase() === tag) {
          return true;
        }
        container = container.parentNode;
      }
    }
    return false;
  };

  const applyFormat = (tagName) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const tag = document.createElement(tagName);
      tag.appendChild(range.extractContents());
      range.insertNode(tag);
      range.setStart(tag, 0);
      range.setEnd(tag, tag.childNodes.length);
      selection.removeAllRanges();
      selection.addRange(range);
      onChange({ target: { id: 'molecularFormula', value: pRef.current.innerHTML } });
    }
  };

  const removeFormat = (tagName) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      let container = selection.getRangeAt(0).commonAncestorContainer;
      while (container && container.nodeName.toLowerCase() !== tagName) {
        container = container.parentNode;
      }
      if (container) {
        const fragment = document.createDocumentFragment();
        while (container.firstChild) {
          fragment.appendChild(container.firstChild);
        }
        container.parentNode.replaceChild(fragment, container);
        range.setStart(fragment, 0);
        range.setEnd(fragment, fragment.childNodes.length);
        selection.removeAllRanges();
        selection.addRange(range);
        onChange({ target: { id: 'molecularFormula', value: pRef.current.innerHTML } });
      }
    }
  };

  const toggleFormat = (tagName) => {
    if (isFormatActive(tagName)) {
      removeFormat(tagName);
    } else {
      applyFormat(tagName);
    }
  };

  const toggleSuperscript = () => {
    toggleFormat('sup');
  };

  const toggleSubscript = () => {
    toggleFormat('sub');
  };

  return {
    pRef,
    showButton,
    handleFocus,
    handleBlur,
    toggleSuperscript,
    toggleSubscript,
  };
};

export default useSubSup;
