import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { sizes, lightColors } from "./colorThemes";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class AgendaScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: {},

            data: {
                '2021-03-06': [{ name: 'item 1 - any js object' }],
                '2021-03-07': [{ name: 'item 2 - any js object', height: 80 }],
                '2021-03-08': [],
                '2021-03-09': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
            }

        };
    }

    importData = async () => {
        try {
            const data = [];
            let keys = await AsyncStorage.getAllKeys();
            for (let inKey of keys) {
                let obj = await AsyncStorage.getItem(inKey);
                obj = JSON.parse(obj);

                const DATE = this.formatDate(obj.date);

                const newAgendaObject = {
                    [DATE]: [{
                        id: DATE,
                        name: obj.title,
                        height: 100

                    }],
                }


                data.push(newAgendaObject);
            }
            console.log(data)
            return data;

        } catch (error) {
            console.error(error)
        }
    }




    render() {


       // console.log(this.state.items);

        return (

            <View style={{ flex: 1 }}>

                <Agenda
                    
//La lista de elementos que deben mostrarse en la agenda.
// Si desea representar el elemento como una fecha vacía, el valor de la clave de fecha debe ser una matriz vacía []. Si no existe ningún valor para la clave de fecha, es
//consideró que la fecha en cuestión aún no está cargada
                    items={this.state.items}
                    /*  items={{
                          '2021-01-19': [{ name: 'item 1 - any js object' }],
                          '2021-01-19': [{ name: 'item 2 - any js object', height: 80 }],
                          '2021-01-20': [],
                          '2021-01-19': [{ name: 'item 3 - any js object' }]
                      }} */
                    markingType={'custom'}

                    //Devolución de llamada que se llama cuando se deben cargar elementos para un mes determinado (el mes se hizo visible)
                    //  loadItemsForMonth={(month) => { console.log('trigger items loading') }}
                    loadItemsForMonth={this.loadItems.bind(this)}

                    // Devolución de llamada que se activa cuando se abre o se cierra el calendario
                    onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}
                    // Devolución de llamada que se llama en la prensa del día
                    // onDayPress={(day) => { console.log('day pressed') }}
                    // Devolución de llamada que se llama cuando cambia el día mientras se desplaza la lista de agenda
                    onDayChange={(day) => { console.log('day changed') }}
                    // Día seleccionado inicialmente
                    // selected={'2021-01-19'}
                    // Fecha mínima que se puede seleccionar, las fechas anteriores a minDate aparecerán atenuadas. Predeterminado = indefinido
                    
                    minDate={'2020-01-01'}
                    // Fecha máxima que se puede seleccionar, las fechas posteriores a maxDate aparecerán atenuadas. Predeterminado = indefinido
                    // maxDate={'2022-05-30'}
                    // Cantidad máxima de meses permitidos para desplazarse al pasado. Predeterminado = 50
                    pastScrollRange={12}
                    // Cantidad máxima de meses permitidos para desplazarse al futuro. Predeterminado = 50
                    futureScrollRange={12}
                    // Especificar cómo se debe representar cada elemento en la agenda
                    //  renderItem={(item, firstItemInDay) => { return (<View />); }}
                    renderItem={this.renderItem.bind(this)}
                    // displayLoadingIndicator={true}
                    // Especifique cómo debe representarse cada fecha. El día puede estar indefinido si el artículo no es el primero en ese día.
                    //  renderDay={(day, item) => { return (<View />); }}
                    // renderDay={(day, item) => (<Text>{day ? day.day : 'item'}</Text>)}
                    /* onDayPress={(day) => {
                         getSelectedDayEvents(day.dateString);
                         //para cambiar el mes y el año en la parte superior de la agenda
                         setDate(moment(day.dateString).format("MMMM YYYY"));
                         //set the date in case onRefresh is executed
                         setDateToRefresh(day.dateString);
                     }
                     }*/
                    // Especifique cómo se debe representar el contenido de fecha vacío sin elementos
                    //renderEmptyDate={() => { return (<View />); }}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}

                    // Especifique cómo debe verse la perilla de la agenda
                    // renderKnob={() => { return (<View />); }}
                    renderKnob={this.renderKnobIcon.bind(this)}
                    // Especifique qué se debe representar en lugar de ActivityIndicator
                    //    renderEmptyData={() => { return (<View />); }}
                    // Especifique su función de comparación de artículos para un mayor rendimiento
                    rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
                    // Ocultar botón de perilla. Predeterminado = falso
                    hideKnob={false}
                    // De forma predeterminada, las fechas de la agenda están marcadas si tienen al menos un elemento, pero puede anular esto si es necesario

                    markedDates={{
                        '2021-01-16': { selected: true, marked: true, startingDay: true },
                        '2021-01-17': { marked: true },
                        '2021-01-18': { disabled: true }
                    }}
                    firstDay={1}
                    //Si disabledByDefault={true}, se habilitarán las fechas marcadas como no deshabilitadas. Default = false
                    disabledByDefault={false}
                    // Si se proporciona, se agregará un RefreshControl estándar para la funcionalidad "Pull to Refresh". Asegúrese también de configurar correctamente el apoyo refrescante.
                    onRefresh={() => console.log('refreshing...')}
                    // Establezca esto como verdadero mientras espera nuevos datos de una actualización
                    refreshing={false}
                    // Agregue un componente RefreshControl personalizado, que se usa para proporcionar la funcionalidad de extracción para actualizar para ScrollView.
                    //  refreshControl={null}
                    // Tema de Agenda
                    showScrollIndicator={true}
                    scrollEnabled={true}

                    pagingEnabled={true}

                    theme={{
                        agendaKnobColor: '#283747',
                        agendaDayTextColor: '#283747',
                        agendaDayNumColor: '#283747',
                        agendaTodayColor: '#283747',
                        agendaKnobColor: '#283747',
                        indicatorColor: '#283747',
                        textSectionTitleColor: '#283747',
                        dotColor: '#283747',
                        selectedDayBackgroundColor: '#283747',
                        arrowColor: '#283747',
                        textDayFontSize: 12,
                        textMonthFontSize: 20,
                        textDayHeaderFontSize: 14,
                        textDayHeaderFontWeight: 'bold'

                    }}
                    // Agenda container

                    style={{

                        //height: 20

                    }}
                />

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Form')} style={{ backgroundColor: 'white', position: 'absolute', borderRadius: 50, width: 50, height: 50, zIndex: 50, right: 20, bottom: 20, alignItems: 'center', elevation: 20 }} >
                    <AntDesign name="pluscircle" color='#283747' size={50} />
                </TouchableOpacity>
            </View>

        );
    }





    loadItems(day) {
        setTimeout(() => {


        

            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);

              

                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {
                newItems[key] = this.state.items[key];

            });
            this.setState({
                items: newItems
            });
        }, 1000);
    }



    loadItems(day) {
        
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                console.log(strTime);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {
                newItems[key] = this.state.items[key];

            });
            this.setState({
                items: newItems
            });
       
    }


   


    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }




    renderItem(item) {
        return (
            <TouchableOpacity style={[styles.item, { height: item.height }]} onPress={() => Alert.alert(item.name)}>
                <Text style={styles.textStyle} >{item.name}</Text>
            </TouchableOpacity>
        );
    }


    renderEmptyDate() {
        return (
            <TouchableOpacity style={[styles.item, {}]}>
                <MaterialCommunityIcons name="exclamation-thick" size={15} color="#283747" />
                <Text style={styles.textStyle}>Wow, Look! Nothing!</Text>
            </TouchableOpacity>
        );
    }




    renderKnobIcon() {
        return (
            <TouchableOpacity /*onPress = {() => openCalendar ? setOpenCalendar(false) : setOpenCalendar(true)}*/>
                <MaterialCommunityIcons name="ray-vertex" size={30} color="#283747" />
            </TouchableOpacity>
        );
    }



}

const styles = StyleSheet.create({

    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    dateViewStyle: {
        flexDirection: "row",
        justifyContent: "center",
        height: "auto"
    },
    dateStyle: {
        color: "#283747",
        fontSize: 18,
        padding: 10,
        margin: 5,
        borderRadius: 5
    },
    viewStyle: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 5,
        marginTop: 30,
        height: 50
    },
    textStyle: {
        //fontSize: 18,
        margin: 5,
        color: '#283747',
        fontSize: sizes.font,
        fontWeight: "500",
        color: '#283747',

    }

});