const data = {
    moneyValue: 1000,
    resorcesValue: 1000,
    experienceValue: 1000,
}

const dataDrillValue = {
    fuelValue: 0,
    sparePartValue: 0,
}

const dataHouseValue = {
    waterValue: 0,
    foodValue: 0,
    storageValue: 0,
}

// Узлы со значениями основной панели
const moneyValue = document.querySelector(".money__value")
const resorcesValue = document.querySelector(".resorces__value")
const experienceValue = document.querySelector(".experience__value")

// Бур
// Узлы со значениями панели буровой
const fuelValue = document.querySelector(".fuel__value")
const sparePartValue = document.querySelector(".spare-part__value")

// Узлы кнопок поплнения ресурсов буровой
const fuelFill = document.querySelector(".fuel__fill")
const sparePartFill = document.querySelector(".spare-part__fill")

// Узел кнопки запуска буровой
const drillRun = document.querySelector(".drill__run")

// Дом
// Узлы со значениями панелей дома
const waterValue = document.querySelector(".water__value")
const foodValue = document.querySelector(".food__value")
const storageValue = document.querySelector(".storage__value")

// Функция рендера значений основной панели
function renderValueMainPanel(data) {
    moneyValue.textContent = data.moneyValue
    resorcesValue.textContent = data.resorcesValue
    experienceValue.textContent = data.experienceValue
}

// Функция рендера значений панели буровой
function renderValueDrillPanel(dataDrillValue) {
    fuelValue.textContent = dataDrillValue.fuelValue
    sparePartValue.textContent = dataDrillValue.sparePartValue
}

// Функция рендера значений панелей дома
function renderValueHousePanels(dataHouseValue) {
    waterValue.textContent = dataHouseValue.waterValue
    foodValue.textContent = dataHouseValue.foodValue
    storageValue.textContent = dataHouseValue.storageValue
}

// Функция рендера всех значений
function renderFullValue(data, dataDrillValue, dataHouseValue) {
    renderValueMainPanel(data)
    renderValueDrillPanel(dataDrillValue)
    renderValueHousePanels(dataHouseValue)
}

// Функция пополнения топлива буровой
function fellFuelValueDrill(data, dataDrillValue) {
    const value = dataDrillValue.fuelValue
    const difference = 200 - value

    dataDrillValue.fuelValue = 200

    fuelValue.textContent = dataDrillValue.fuelValue

    data.resorcesValue -= difference 

    renderValueMainPanel(data)
}

// Функция пополнения запчастей буровой
function fellSparePartValueDrill(data, dataDrillValue) {
    const value = dataDrillValue.sparePartValue
    const difference = 50 - value

    dataDrillValue.sparePartValue = 50

    sparePartValue.textContent = dataDrillValue.sparePartValue

    data.resorcesValue -= difference 

    renderValueMainPanel(data)
}

// Функция работы буровой
function runDrill(dataDrillValue, dataHouseValue) {
    setInterval(() => {
        dataDrillValue.fuelValue -= 4
        dataDrillValue.sparePartValue -= 1
        dataHouseValue.storageValue += 1

        renderValueDrillPanel(dataDrillValue)
        renderValueHousePanels(dataHouseValue)
    },1000)
}

// Обработчики пополнения ресурсов буровой
fuelFill.addEventListener("click", () => fellFuelValueDrill(data, dataDrillValue))
sparePartFill.addEventListener("click", () => fellSparePartValueDrill(data, dataDrillValue))

// Обработчик первого рендера
document.addEventListener("DOMContentLoaded", () => renderFullValue(data, dataDrillValue, dataHouseValue))

// Обработчик запуска буровой
drillRun.addEventListener("click", () => runDrill(dataDrillValue, dataHouseValue))