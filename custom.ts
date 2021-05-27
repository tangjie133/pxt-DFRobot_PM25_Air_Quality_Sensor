
/**
 * 使用此文件来定义自定义函数和图形块。
 * 想了解更详细的信息，请前往 https://makecode.microbit.org/blocks/custom
 */

enum MyEnum {
    //% block="PM1.0"
    PM1_0,
    //% block="PM2.5"
    PM2_5,
    //% block="PM10"
    PM10
}
enum MyEnum1 {
    //% block="0.3um/0.1L"
    UM03,
    //% block="0.5um/0.1L"
    UM05,
    //% block="1.0um/0.1L"
    UM10,
    //% block="2.5um/0.1L"
    UM25,
    //% block="5.0um/0.1L"
    UM50,
    //% block="10um/0.1L"
    UM100
}

/**
 * 自定义图形块
 */
//% weight=100 color=#0fbc11 icon="" block="PM2.5 Air Quality Sensor"
namespace custom {
    let buffer:number[] = [];
    let I2CAddr = 0x19;
    /**
     * TODO: 请求原始数据
     */
    //% block="request data"
    //% weight=99
    export function requestData(): void {
        pins.i2cWriteNumber(I2CAddr, 0X05, NumberFormat.Int8LE)
        let _buffer = pins.i2cReadBuffer(I2CAddr, 25)
        for(let i = 0; i < 25; i++){
            buffer[i]=_buffer[i];
        }
    }

    /**
     * TODO: 标准下数据
     * @param eOption 获取数据选项
     */
    //% block="standard concentration %eOption"
    //% weight=98
    export function standard(eOption: MyEnum): number {
        let data;
        switch(eOption){
            case MyEnum.PM1_0:
                data = (buffer[0]<<8)|buffer[1];
            break;
            case MyEnum.PM2_5:
                data = (buffer[2]<<8)|buffer[3];
            break;
            default:
                data = (buffer[4]<<8)|buffer[5]
        }
        return data;
    }
    /**
     * TODO: 大气下数据
     * @param eOption 获取数据选项
     */
    //% block="atmosphere concentration %eOption"
    //% weight=97
    export function atmosphere(eOption: MyEnum): number {
        let data;
        switch(eOption){
            case MyEnum.PM1_0:
                data = (buffer[6]<<8)|buffer[7];
            break;
            case MyEnum.PM2_5:
                data = (buffer[8]<<8)|buffer[9];
            break;
            default:
                data = (buffer[10]<<8)|buffer[11]
        }
        return data;
    }
    /**
     * TODO: 空气中粒子数
     * @param eOption 获取数据选项
     */
    //% block="particle number %eOption"
    //% weight=96
    export function particleNumber(eOption: MyEnum1): number {
        let data;
        switch(eOption){
            case MyEnum1.UM03:
                data = (buffer[12]<<8)|buffer[13];
            break;
            case MyEnum1.UM05:
                data = (buffer[14]<<8)|buffer[15];
            break;
            case MyEnum1.UM10:
                data = (buffer[16]<<8)|buffer[17];
            break;
            case MyEnum1.UM25:
                data = (buffer[18]<<8)|buffer[19];
            break;
            case MyEnum1.UM50:
                data = (buffer[20]<<8)|buffer[21];
            break;
            default:
                data = (buffer[22]<<8)|buffer[23]
        }
        return data;
    }
     /**
     * TODO: 获取版本
     */
    //% block="read version"
    //% weight=96
    export function readVersion(): number {
        return buffer[24];
    }
}