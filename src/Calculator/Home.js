/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';

const Home = () => {
  const [value, setvalue] = useState({});

  const evaluate = ({prev, current, operation}) => {
    const p = parseFloat(prev);
    const c = parseFloat(current);
    let computation;
    if (isNaN(p) && isNaN(c)) {
      return '';
    }
    switch (operation) {
      case '+':
        computation = p + c;
        break;
      case '-':
        computation = p - c;
        break;
      case '*':
        computation = p * c;
        break;
      case '/':
        computation = p / c;
        break;
      default:
        break;
    }
    return computation;
  };

  const inputNum = ({type, val}) => {
    switch (type) {
      case 'add':
        if (value.overwrite) {
          setvalue(pre => ({...pre, current: val, overwrite: false}));
          break;
        }
        if (val == '0' && value.current == '0') {
          break;
        }
        if (val === '.' && value.current?.includes('.')) {
          break;
        }
        setvalue(pre => {
          return {
            ...pre,
            current: `${pre.current || ''}${val}`,
          };
        });

        break;
      case 'clear':
        setvalue({});
        break;
      case 'operation':
        if (value.current == null && value.prev == null) {
          setvalue(value);
        }
        if (value.current == null) {
          setvalue(pre => {
            return {
              ...pre,
              operation: val,
            };
          });
        }
        if (value.prev == null) {
          setvalue(pre => {
            console.log('pp', pre.current);
            return {
              ...pre,
              operation: val,
              prev: pre.current,
              current: null,
            };
          });
        }
        if (value.prev != null && value.current != null) {
          setvalue(pre => {
            return {
              ...pre,
              prev: evaluate(pre),
              operation: val,
              current: null,
            };
          });
        }
        break;
      case 'equal':
        if (
          value.current == null ||
          value.prev == null ||
          value.operation == null
        ) {
          setvalue(value);
        }
        setvalue(pre => {
          return {
            ...pre,
            overwrite: true,
            current: evaluate(value),
            prev: pre.current,
            operation: null,
          };
        });
        break;
      case 'percent':
        if (value.current == null) {
          break;
        }
        setvalue(pre => {
          return {
            ...pre,
            current: pre.current / 100,
          };
        });
        break;
      case 'plusminus':
        if (value.current == null) {
          break;
        }
        if (value.current > 0) {
          setvalue(pre => {
            return {
              ...pre,
              current: '-' + pre.current,
            };
          });
        }
        if (value.current[0] == '-') {
          setvalue(pre => {
            return {
              ...pre,
              current: pre.current.slice(1),
            };
          });
        }
        break;
      default:
        break;
    }
  };

  console.log(value);

  return (
    <View style={{backgroundColor: 'black', height: '100%'}}>
      {/* keypad wrapper */}
      <View style={{position: 'absolute', bottom: 0}}>
        {/* output screen */}
        <View>
          <Text style={styles.screen}>
            {value.current ? value.current : value.prev}
          </Text>
        </View>
        {/* keypad row */}
        <View style={styles.row}>
          <TouchableOpacity onPress={() => inputNum({type: 'clear'})}>
            <View style={[styles.keyrow, {backgroundColor: '#fff'}]}>
              <Text style={[styles.key, {color: 'black'}]}>AC</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => inputNum({type: 'plusminus'})}>
            <View style={[styles.keyrow, {backgroundColor: '#fff'}]}>
              <Text style={[styles.key, {color: 'black'}]}>+/-</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => inputNum({type: 'percent'})}>
            <View style={[styles.keyrow, {backgroundColor: '#fff'}]}>
              <Text style={[styles.key, {color: 'black'}]}>%</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => inputNum({type: 'operation', val: '/'})}>
            <View style={[styles.keyrow, {backgroundColor: '#ed8805'}]}>
              <Text style={styles.key}>÷</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => inputNum({type: 'add', val: '7'})}>
            <View style={styles.keyrow}>
              <Text style={styles.key}>7</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => inputNum({type: 'add', val: '8'})}>
            <View style={styles.keyrow}>
              <Text style={styles.key}>8</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => inputNum({type: 'add', val: '9'})}>
            <View style={styles.keyrow}>
              <Text style={styles.key}>9</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => inputNum({type: 'operation', val: '*'})}>
            <View style={[styles.keyrow, {backgroundColor: '#ed8805'}]}>
              <Text style={styles.key}>×</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => inputNum({type: 'add', val: '4'})}>
            <View style={styles.keyrow}>
              <Text style={styles.key}>4</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => inputNum({type: 'add', val: '5'})}>
            <View style={styles.keyrow}>
              <Text style={styles.key}>5</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => inputNum({type: 'add', val: '6'})}>
            <View style={styles.keyrow}>
              <Text style={styles.key}>6</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => inputNum({type: 'operation', val: '-'})}>
            <View style={[styles.keyrow, {backgroundColor: '#ed8805'}]}>
              <Text style={styles.key}>-</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => inputNum({type: 'add', val: '1'})}>
            <View style={styles.keyrow}>
              <Text style={styles.key}>1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => inputNum({type: 'add', val: '2'})}>
            <View style={styles.keyrow}>
              <Text style={styles.key}>2</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => inputNum({type: 'add', val: '3'})}>
            <View style={styles.keyrow}>
              <Text style={styles.key}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => inputNum({type: 'operation', val: '+'})}>
            <View style={[styles.keyrow, {backgroundColor: '#ed8805'}]}>
              <Text style={styles.key}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => inputNum({type: 'add', val: '0'})}>
            <View
              style={{
                height: 90,
                width: 186,
                backgroundColor: '#202c3b',
                borderRadius: 45,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 3,
              }}>
              <Text style={styles.key}>0</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => inputNum({type: 'add', val: '.'})}>
            <View style={styles.keyrow}>
              <Text style={styles.key}>.</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => inputNum({type: 'equal'})}>
            <View style={[styles.keyrow, {backgroundColor: '#ed8805'}]}>
              <Text style={styles.key}>=</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  row: {display: 'flex', flexDirection: 'row'},
  keyrow: {
    height: 90,
    width: 90,
    backgroundColor: '#202c3b',
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  key: {fontSize: 30, fontWeight: 'bold', color: '#fff'},
  screen: {
    fontSize: 70,
    fontWeight: 'semibold',
    color: '#fff',
    textAlign: 'right',
    marginRight: 25,
  },
});

export default Home;
