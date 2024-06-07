import React from 'react'
import "./ExploreMenu.css"
import { menu_list } from '../../assets/assets'
export const ExploreMenu = ({category,setCategory}) => {
return (
    <div className='explore-menu' id='explore-menu'>
        <h1>explore the dishes</h1>
        <p className='explore-menu-text'>choose from the diverse menu featuring a delectable array of dishes. our mishion is to provide a high quality dishes</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)
                    } key={index} className="explore-menu-list-item">
                        <img className={category===item.menu_name?"Active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
                            })}
        </div>
        <hr />
        </div>
)
}
