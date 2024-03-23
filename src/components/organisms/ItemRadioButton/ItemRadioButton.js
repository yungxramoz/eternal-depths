import React from 'react'
import ItemDetails from '../../molecules/ItemDetails/ItemDetails'
import './ItemRadioButton.css'

const ItemRadioButton = ({
  onChange,
  disabled,
  icon,
  title,
  subtitle,
  description,
  id,
  checked,
}) => {
  return (
    <>
      <input
        disabled={disabled}
        className="rpgui-radio golden"
        name="radio-golden"
        id={id}
        value={id}
        checked={checked}
        type="radio"
        onChange={onChange}
      />
      <label className="item-radio-label" htmlFor={id}>
        <ItemDetails
          title={title}
          subtitle={subtitle}
          description={description}
          icon={icon}
        />
      </label>
    </>
  )
}

export default ItemRadioButton
