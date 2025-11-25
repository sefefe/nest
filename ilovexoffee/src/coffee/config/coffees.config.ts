import { registerAs } from "@nestjs/config";

export default registerAs('coffee', () => ({
    brands: ['buddy brew', 'nescafe']
}));