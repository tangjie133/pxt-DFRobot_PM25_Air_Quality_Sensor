
/**
 * 使用此文件来定义自定义函数和图形块。
 * 想了解更详细的信息，请前往 https://makecode.microbit.org/blocks/custom
 */

enum MyEnum {
    //% block="PARTICLE_PM1_0_STANDARD"
    PM1_0=0X05,
    //% block="PARTICLE_PM2_5_STANDARD"
    PM2_5=0X07,
    //% block="PARTICLE_PM10_STANDARD"
    PM10=0X09,
    //% block="PARTICLE_PM1_0_ATMOSPHERE"
    PM1_0A=0X0B,
    //% block="PARTICLE_PM2_5_ATMOSPHERE"
    PM2_5A=0X0D,
    //% block="PARTICLE_PM10_ATMOSPHERE"
    PM10A=0X0F,

}
enum MyEnum1 {
    //% block="PARTICLENUM_0_3_UM_EVERY0_1L_AIR"
    UM03=0X11,
    //% block="PARTICLENUM_0_5_UM_EVERY0_1L_AIR"
    UM05=0X13,
    //% block="PARTICLENUM_1_0_UM_EVERY0_1L_AIR"
    UM10=0X15,
    //% block="PARTICLENUM_2_5_UM_EVERY0_1L_AIR"
    UM25=0X17,
    //% block="PARTICLENUM_5_0_UM_EVERY0_1L_AIR"
    UM50=0X19,
    //% block="PARTICLENUM_10_UM_EVERY0_1L_AIR"
    UM100=0X1B
}

/**
 * 自定义图形块
 */
//% weight=100 color=#0fbc11 icon="" block="PM2.5 Air Quality Sensor"
namespace custom {
    let I2CAddr = 0x19;
    let PARTICLENUM_GAIN_VERSION = 0x1D;
    /**
     * TODO: 获取指定颗粒物大小
     * @param eOption 获取数据选项
     */
    //% block="particle concentration %eOption"
    //% weight=98
    export function gainParticleConcentration_ugm3(eOption: MyEnum): number {
        let data;
        let buffer;
        switch(eOption){
            case MyEnum.PM1_0:
                buffer = readReg(MyEnum.PM1_0,2);
                data = (buffer[0]<<8)|buffer[1];
            break;
            case MyEnum.PM2_5:
                buffer = readReg(MyEnum.PM2_5,2);
                data = (buffer[0]<<8)|buffer[1];
            break;
            case MyEnum.PM10:
                buffer = readReg(MyEnum.PM10,2);
                data = (buffer[0]<<8)|buffer[1];
            break;
            case MyEnum.PM1_0A:
                buffer = readReg(MyEnum.PM1_0A,2);
                data = (buffer[0]<<8)|buffer[1];
            break;
            case MyEnum.PM2_5A:
                buffer = readReg(MyEnum.PM2_5A,2);
                data = (buffer[0]<<8)|buffer[1];
            break;
            default:
                buffer = readReg(MyEnum.PM10A,2);
                data = (buffer[0]<<8)|buffer[1];
        }
        return data;
    }
    
    /**
     * TODO: 获取在0.1升空气中的颗粒物的个数
     * @param eOption 获取数据选项
     */
    //% block="particle number %eOption"
    //% weight=96
    export function particleNumber(eOption: MyEnum1): number {
        let data;
        let buffer;
        switch(eOption){
            case MyEnum1.UM03:
                buffer = readReg(MyEnum1.UM03,2);
                data = (buffer[0]<<8)|buffer[1];
            break;
            case MyEnum1.UM05:
                buffer = readReg(MyEnum1.UM05,2);
                data = (buffer[0]<<8)|buffer[1];
            break;
            case MyEnum1.UM10:
                buffer = readReg(MyEnum1.UM10,2);
                data = (buffer[0]<<8)|buffer[1];
            break;
            case MyEnum1.UM25:
                buffer = readReg(MyEnum1.UM25,2);
                data = (buffer[0]<<8)|buffer[1];
            break;
            case MyEnum1.UM50:
                buffer = readReg(MyEnum1.UM50,2);
                data = (buffer[0]<<8)|buffer[1];
            break;
            default:
                buffer = readReg(MyEnum1.UM100,2);
                data = (buffer[0]<<8)|buffer[1];
        }
        return data;
    }
     /**
     * TODO: 获取版本
     */
    //% block="read version"
    //% weight=96
    export function readVersion(): number {
        let buffer = readReg(PARTICLENUM_GAIN_VERSION,1);
        return buffer[0];
    }
    /**
     * TODO: 从指定传感器中获取指定长度数据
     * @param  reg 寄存器值
     * @param  len 获取数据长度
     * @return 返回获取数据的buffer
     */
    function readReg(reg:number, len:number):Buffer{
        pins.i2cWriteNumber(I2CAddr, reg, NumberFormat.Int8LE);
        return pins.i2cReadBuffer(I2CAddr, len);
    }

    /**
     * TODO:向指定传感器寄存器中写入数据
     * @param reg 寄存器值
     * @param buf 写入数据
     * @return 无返回
     */
    function writeReg(buf:Buffer):void{
        pins.i2cWriteBuffer(I2CAddr, buf);
    }
}