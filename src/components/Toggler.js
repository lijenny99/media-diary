import React from 'react'
import styled from "styled-components"

const IconWrapper = styled.button`
  opacity: 0.5;
  border: 0;
  position: relative;
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease;
  margin-left: 30px;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: 0;
    top: -30%;
    width: 100%;
    height: 160%;
    background: rgba(255, 255, 255, 0.01);
  }
`;

const MoonOrSun = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: ${p => (p.isDark ? "4px" : "2px")} solid
    ${p => p.theme.primary};
  background: ${p => p.theme.primary};
  transform: scale(${p => (p.isDark ? 0.55 : 1)});
  transition: all 0.45s ease;
  overflow: ${p => (p.isDark ? "visible" : "hidden")};
  &::before {
    content: "";
    position: absolute;
    right: -9px;
    top: -9px;
    height: 24px;
    width: 24px;
    border: 2px solid ${p => p.theme.primary};
    border-radius: 50%;
    transform: translate(${p => (p.isDark ? "14px, -14px" : "0, 0")});
    opacity: ${p => (p.isDark ? 0 : 1)};
    transition: transform 0.45s ease;
  }
  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 ${p => p.theme.primary},
      0 23px 0 ${p => p.theme.primary},
      23px 0 0 ${p => p.theme.primary},
      -23px 0 0 ${p => p.theme.primary},
      15px 15px 0 ${p => p.theme.primary},
      -15px 15px 0 ${p => p.theme.primary},
      15px -15px 0 ${p => p.theme.primary},
      -15px -15px 0 ${p => p.theme.primary};
    transform: scale(${p => (p.isDark ? 1 : 0)});
    transition: all 0.35s ease;
  }
`;

const MoonMask = styled.div`
  position: absolute;
  right: -1px;
  top: -8px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 0;
  background: ${p => p.theme.background};
  transform: translate(${p => (p.isDark ? "14px, -14px" : "0, 0")});
  opacity: ${p => (p.isDark ? 0 : 1)};
  transition: ${p => p.colorModeTransition}, transform 0.45s ease;
`;

const Toggle = ({ theme, toggleTheme }) => {
    let isDark = null;
    if (theme === 'light') {
        isDark = false;
    } else {
        isDark = true;
    }
    return (
        <IconWrapper
            style={{float:'right'}}
            isDark={isDark}
            onClick={toggleTheme}
            data-a11y="false"
            aria-label={isDark ? "Turn the lights on" : "Dim the lights"}
            title={isDark ? "Turn the lights on" : "Dim the lights"}
        >
            <MoonOrSun isDark={isDark} />
            <MoonMask isDark={isDark} />
        </IconWrapper>
    )
};

export default Toggle;