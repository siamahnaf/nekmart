import { ConfigService } from "@nestjs/config";

//Config Service
const configService = new ConfigService();

export const sentSms = async (to: string, message: string) => {
    const greenwebsms = new URLSearchParams();
    greenwebsms.append('token', configService.get<string>("SMS_TOKEN"));
    greenwebsms.append('to', `+${to}`);
    greenwebsms.append('message', message);
    return greenwebsms;
}