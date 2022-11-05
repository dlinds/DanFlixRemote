import React, { useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Shadow } from "react-native-shadow-2"
import Button from "../../atoms/Button"
const Category = ({ categoryList }: any) => {
  const [tempData, setTempData] = useState([
    {
      id: 0,
      title: "Presets",
      isActive: true
    },
    {
      id: 1,
      title: "Devices",
      isActive: false
    },
    {
      id: 2,
      title: "Suggestions",
      isActive: false
    }
  ])

  const activeButtonProps = {
    isActiveInput: true
  }

  const handleChangeCategory = (id: number) => {
    setTempData(prev =>
      prev.map(category =>
        category.id === id
          ? { ...category, isActive: true }
          : { ...category, isActive: false }
      )
    )
  }

  return (
    <View style={styles.container}>
      {tempData.map(category => {
        return (
          <TouchableOpacity
            onPress={() => handleChangeCategory(category.id)}
            key={category.id}
          >
            {category.isActive ? (
              <Shadow
                distance={4}
                startColor={"#ffff0070"}
                endColor={"#263D47"}
                style={styles.shadow}
              >
                <Button
                  variant="standard"
                  title={category.title}
                  {...activeButtonProps}
                  containerProps={{
                    ...styles.sharedButton,
                    ...styles.activeInput
                  }}
                />
              </Shadow>
            ) : (
              <Button
                variant="standard"
                title={category.title}
                containerProps={styles.sharedButton}
              />
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  sharedButton: {
    alignItems: "flex-start",
    paddingLeft: 15,
    minWidth: "80%",
    height: 43
  },
  activeInput: {
    minWidth: "100%"
  },
  shadow: {
    borderRadius: 5
  }
})

export default Category
