import React, {
  createContext,
  SyntheticEvent,
  useCallback,
  useContext,
  useState,
} from 'react'

interface INavbarIsClicked {
  chat: boolean
  cart: boolean
  userProfile: boolean
  notification: boolean
}

interface IStateContext {
  initialState: INavbarIsClicked
  activeMenu: boolean
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>
  isClicked: INavbarIsClicked
  setIsClicked: React.Dispatch<React.SetStateAction<INavbarIsClicked>>
  handleClick: (value: string) => void
  screenSize: number
  setScreenSize: (value: number) => void
  currentColor: string
  setCurrentColor: (value: string) => void
  setCurrentMode: (value: string) => void
  currentMode: string
  themeSettings: boolean
  setThemeSettings: (value: boolean) => void
  setMode: (event: SyntheticEvent) => void
  setColor: (value: string) => void
}

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
}

const StateContext = createContext<IStateContext>(undefined)

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true)
  const [isClicked, setIsClicked] = useState<INavbarIsClicked>(initialState)
  const [screenSize, setScreenSize] = useState<number | null>(null)
  const [currentColor, setCurrentColor] = useState<string>('#03C9D7')
  const [currentMode, setCurrentMode] = useState<string>('Light')
  const [themeSettings, setThemeSettings] = useState<boolean>(false)

  const setMode = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setCurrentMode(e.target.value)
      localStorage.setItem('themeMode', e.target.value)

      setThemeSettings(false)
    },
    []
  )

  // const setMode: React.ChangeEventHandler<HTMLInputElement> = (e) => {
  //   setCurrentMode(e.target.value)
  //   localStorage.setItem('themeMode', e.target.value)

  //   setThemeSettings(false)
  // }

  const setColor = (value) => {
    setCurrentColor(value)
    localStorage.setItem('colorMode', value)

    setThemeSettings(false)
  }

  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true })
  }

  return (
    <StateContext.Provider
      value={{
        initialState,
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentColor,
        setCurrentColor,
        setCurrentMode,
        currentMode,
        themeSettings,
        setThemeSettings,
        setMode,
        setColor,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
