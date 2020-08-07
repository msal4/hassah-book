import { Resolver, Root, FieldResolver, Args, Authorized } from "type-graphql";

import { User } from "@api/entity/User";
import { PagniationArgs } from "@api/modules/shared/types/PaginationArgs";
import { UserRequestService } from "@api/modules/user-request/user-request/UserRequest.service";
import { FavoriteService } from "@api/modules/favorite/favorite/Favorite.service";
import {
  PaginatedUserRequestResponse,
  PaginatedFavoriteResponse,
  PaginatedOrderResponse,
} from "@api/modules/shared/types/PaginatedResponse";
import { OrderService } from "@api/modules/order/order/Order.service";
import { Roles } from "@api/modules/utils/auth";

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userRequestService: UserRequestService,
    private readonly favoriteService: FavoriteService,
    private readonly orderService: OrderService
  ) {}

  @Authorized(Roles.Admin)
  @FieldResolver(() => PaginatedUserRequestResponse)
  requests(
    @Root() user: User,
    @Args() { skip, take }: PagniationArgs
  ): Promise<PaginatedUserRequestResponse> {
    return this.userRequestService.findAll({ where: { user }, skip, take });
  }

  @Authorized(Roles.Admin)
  @FieldResolver(() => PaginatedFavoriteResponse)
  favorites(@Root() user: User, @Args() { skip, take }: PagniationArgs): Promise<PaginatedFavoriteResponse> {
    return this.favoriteService.findAll({ where: { user }, skip, take });
  }

  @Authorized(Roles.Admin)
  @FieldResolver(() => PaginatedOrderResponse)
  orders(@Root() user: User, @Args() { skip, take }: PagniationArgs): Promise<PaginatedOrderResponse> {
    return this.orderService.findAll({ where: { user }, skip, take });
  }
}
