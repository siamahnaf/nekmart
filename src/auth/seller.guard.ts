import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//Orm entity
import { Seller } from '@/seller/model/seller.entity';

@Injectable()
export class SellerGuard implements CanActivate {
    //Constructor
    constructor(
        @InjectRepository(Seller) private sellerRepository: Repository<Seller>
    ) { }

    //Can activate
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        try {
            const { user } = context.switchToHttp().getNext();
            const seller = await this.sellerRepository.findOne({
                where: {
                    user: user.id,
                    is_verified: true,
                    is_banned: false
                }
            });
            if (!seller) throw new HttpException("Unauthorized Request", HttpStatus.UNAUTHORIZED);
            return true;
        } catch {
            throw new HttpException("Unauthorized Request", HttpStatus.UNAUTHORIZED);
        }
    }
}