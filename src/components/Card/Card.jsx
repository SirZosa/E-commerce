export default function Card({children, pic}){
    return(
        <div className="Card">
            <div style={{backgroundImage:`url(${pic})`, position:'absolute', top:0, left:0, width:'90vw',height:'30vh',backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center', filter: 'brightness(85%)'}}></div>
            <div className="Card-inside">
                {children}
            </div>
        </div>
    )
}

