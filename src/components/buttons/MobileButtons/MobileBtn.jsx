import classNames from "classnames"

export default function MobileBtn({children, color}){
    const btnColor = color === "transparent" ? "bg-transparent" : "bg-solid"
    const btnClass = classNames(btnColor, "mobileBtn")
    return(
        <a href="#" className={btnClass}>{children}</a>
    )
}