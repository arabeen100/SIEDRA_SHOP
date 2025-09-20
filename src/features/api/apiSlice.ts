import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
interface ApiResponse<T> {
  status: boolean
  message: string
  data: T
}
interface MostEndpointsData {
  message: string
}
interface PaymentInfoResponse {
  total_amount: number
}
interface LoginData {
  user: User
  token: string
  message: string
}
interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  "Last-Log-In": string  
  "Adding-Date": string  
}
interface CarouselItem {
  ID: number
  Image_Name: string
  Title_du: string
  Description_du: string
  Adding_Date: string
  Image_link: string
}
interface CarouselData {
  carousels: CarouselItem[]
}
interface Subcategory1 {
  id: number| string;
  name_ar: string
  name_du: string
  total_subcategory_products: string
  category: Category1 
}
interface Category1 {
  id: number|string;
  name_ar: string
  name_du: string
  add_date: string
  Image_link: string
  Cover_Image_link: string
  total_category_products: string
  subs: Subcategory1[]
}
interface CategoriesData {
  categories: Category1[]
}
interface Coupon {
  coupon: string
  description: string
  value: number
}
interface PaymentInfo {
  order_id: string
  price: number
  shipping: number
  payment_gate: string
  html_snippet: string
}
interface PlaceOrderData {
  message: string
  payment_info: PaymentInfo
}
interface shippingPrice {
    shippingPrice: number
}
interface confirmPaymentData {
  order_id: string
  payment_id: string
}
interface confirmPayment{
    message:string
}
interface GetCouponParams {
  coupon: string
}
interface RepaymentInfo {
  order_id: number
  price: number
  shipping: number
  html_snippet: string
}
interface PlacingOrderData {
  payment_info: RepaymentInfo
}
interface GetRepaymentParams {
  id: string
}
interface GetCategoryProductsParams {
    categoryName?: string
    color?: string
    size?: string
    sort?: string
    limit?: number
    offset?: number
    min_price?: number
    max_price?: number
}
interface GetSubcategoryProductsParams {
    subcategoryName?: string
    color?: string
    size?: string
    sort?: string
    limit?: number
    offset?: number
    min_price?: number
    max_price?: number
}
interface GetMostVisitedParams {
  limit?: number
}
interface GetProductParams {
  name?: string
}

 interface Category {
  id: string | number;
  name_ar: string;
  name_du: string;
  add_date: string;
  Image_link: string;
  Cover_Image_link: string;
  total_category_products: string | number;
}

 interface Subcategory {
  id: string | number;
  name_ar: string;
  name_du: string;
  total_subcategory_products: string | number;
  category: Category;
}

 interface Sale {
  ID: string | number;
  Value: string | number;
  End_Date: string;
}

 interface Dimension {
  ID: string | number;
  Value: string;
}

 interface Image {
  ID: string | number;
  "Image-Name": string;
  link: string;
}


 interface Product {
  id: string | number;
  name_ar: string;
  name_du: string;
  description_ar: string;
  description_du: string;
  notes_ar: string | null;
  notes_du: string | null;
  price: string | number;
  count: string | number;
  shippingPrice: string | number;
  shippingTime: string | number;
  availability: boolean | number;
  sale: Sale | null;
  visits: string | number;
  sales: string | number;
  rating: string | number;
  ratingCount: string | number;
  add_date: string;
  dimensions: Dimension[];
  colors: string[];
  sizes: string[];
  images: Image[];
  category: Category;
  subcategory: Subcategory;
}


 interface ProductFilters {
  max_price:  number;
  min_price:  number;
  colors: string[];
  sizes: string[];
}


 interface ProductsResponse {
  status: boolean;
  message: string;
  data: {
    products?: Product[];
    product?:Product;
    total_filter_products?: string | number;
    filters?: ProductFilters;
    category?: Category;
    subcategory?: Subcategory;
  };
}
interface GetSalesParams {
    color?: string
    size?: string
    sort?: string
    limit?: number
    offset?: number
    min_price?: number
    max_price?: number
    category?: string
    subcategory?: string
}
interface GetSearchProductsParams {
    name: string|undefined
    limit?: number
    offset?: number
}
interface ProductRating {
  rating: number;
  ratingCount: number;
}
interface GetRatingParams {
  productName: string;
  rating: number;
}
// Cart item type
interface Category {
  id: number|string;
  name_ar: string;
  name_du: string;
  add_date: string;
  Image_link: string;
  Cover_Image_link: string;
  total_category_products: number|string;
}

interface Subcategory {
  id: number|string;
  name_ar: string;
  name_du: string;
  total_subcategory_products: number|string;
  category: Category;
}

interface CartItem {
  id: number;
  name_ar: string;
  name_du: string;
  description_ar: string;
  description_du: string;
  notes_ar: string | null;
  notes_du: string | null;
  price: number;
  count: number;
  shippingPrice: number;
  shippingTime: number;
  availability: boolean;
  sale: number; // or Sale if مش دايماً 0
  visits: number;
  sales: number;
  rating: number;
  ratingCount: number;
  add_date: string;
  dimensions: any[]; // تقدر تعمل لها type منفصل لو عندك
  colors: string[];
  sizes: any[]; // برضه تقدر تعمل type منفصل
  images: any[]; // ممكن تعملها interface Image[]
  category: Category;
  subcategory: Subcategory;
  quantity: number;
  selectedColor: string | null;
  selectedSize: string | null;
  selectedDimension: string | null;
  total: number;
  cart_id: number;
}

 interface CartResponse {
  cart_items: CartItem[];
}
interface GetCartParams {
  do: 'view' | 'add' | 'remove' | 'update';
  product?: Product;
  id?: number|string;
}
// User type
 interface User1 {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  lastLogin: string; // mapped from "Last-Log-In"
  addingDate: string; // mapped from "Adding-Date"
}

// Response type
 interface UserData {
    user:User1;
    message?: string;
}
// Single order item
interface ProductInfo {
  name_ar: string;
  name_du: string;
  image: string;
}

interface OrderProduct {
  ID: number;
  ItemPrice: number;
  Dimension: string | null;
  Color: string | null;
  Size: string | null;
  Count: number;
  SaleValue: number;
  Total: number;
  Product: ProductInfo;
}
interface Order {
  ID: number;
  Address: string;
  Notes: string | null;
  Price: number;
  Shipping: number;
  Customer_Name: string;
  Customer_Phone: string;
  Customer_Email: string;
  Payment_Gate: string;
  Payment_Status: string;
  Status: string;
  Order_ID: string;
  CouponValue: number;
  Adding_Date: string; // تقدر تخليها Date لو هتعمل parsing
  Products: OrderProduct[];
}
interface OrdersData {
  orders: Order[];
}

interface GetWishListParams {
  do: 'view' | 'add' | 'remove';
    product?: string;
}
// Image of a product
interface ProductImage {
  ID: number;
  "Image-Name": string;
  link: string;
}

// Category
interface Category {
  id: number|string;
  name_ar: string;
  name_du: string;
  add_date: string;
  Image_link: string;
  Cover_Image_link: string;
  total_category_products: string|number;
}

// Subcategory
interface Subcategory {
  id: string|number;
  name_ar: string;
  name_du: string;
  total_subcategory_products:string|number;
  category: Category;
}

// Single wishlist item
interface WishlistItem {
  id: number;
  name_ar: string;
  name_du: string;
  description_ar: string;
  description_du: string;
  notes_ar: string | null;
  notes_du: string | null;
  price: number;
  count: number;
  shippingPrice: number;
  shippingTime: number;
  availability: boolean;
  sale: boolean | number; // can be false or an object/number in some endpoints
  visits: number;
  sales: number;
  rating: number;
  ratingCount: number;
  add_date: string;
  dimensions: string[]; // some endpoints use objects, adjust if needed
  colors: string[];
  sizes: string[];
  images: ProductImage[];
  category: Category;
  subcategory: Subcategory;
}

// Response for getting wishlist items
interface WishlistResponse {
  wishlist_items: WishlistItem[];
}

// Response for adding/removing a product from wishlist
interface WishlistActionResponse {
  message: string;
}






export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://siedra-shop.eu/api' }),
    tagTypes:["profile"],
    endpoints: (builder) => ({
             register:builder.mutation<ApiResponse<MostEndpointsData>,FormData>({
            query:(newUser)=>({
                url: '/auth/register',
                method: 'POST',
                body: newUser,
            })
        }),
            verifyEmail:builder.mutation<ApiResponse<MostEndpointsData>,FormData>({
            query:(code)=>{
                return({
                url:'/auth/verifyEmail',
                method:'POST',
                body:code,
            })}
        }),
            logIn:builder.mutation<ApiResponse<LoginData>,FormData>({
            query:(loginUser)=>{
                return({
                url:'/auth/login',
                method:'POST',
                body:loginUser,
            })}
        }),
            forgotPasswoed:builder.mutation<ApiResponse<MostEndpointsData>,FormData>({
            query:(email)=>{
                return({
                url:'/auth/forgotPassword',
                method:'POST',
                body:email,
            })}
        }),
            resetPasswoed:builder.mutation<ApiResponse<MostEndpointsData>,FormData>({
            query:(resetPass)=>{
                return({
                url:'/auth/resetPassword',
                method:'POST',
                body:resetPass,
            })}
        }),
            logOut:builder.mutation<ApiResponse<MostEndpointsData>,void>({
             query:()=>{
                 const token=localStorage.getItem("userToken")
                return{
                url:'/auth/logout',
                method:'POST',
                headers:{
                    "Authorization":`Bearer ${token}`
                }
              }
             }
        }),
            getCarousels:builder.query<ApiResponse<CarouselData>,void>({
            query:()=>'/carousels/'
        }),
              getCategories:builder.query<ApiResponse<CategoriesData>,void>({
            query:()=>'/categories/'
        }),
             contact:builder.mutation<ApiResponse<MostEndpointsData>,FormData>({
            query:(contact)=>{
                return({
                url:'/contactus/',
                method:'POST',
                body:contact,
            })}
        }),
           getCoupon:builder.query<Coupon,GetCouponParams>({
            query:({coupon})=>({
                url:'/orders/coupon',
                params:{coupon},
            }),
        }),
           checkOut:builder.mutation<ApiResponse<PlaceOrderData>,FormData>({
            query:(orderData)=>{
                const token=localStorage.getItem("userToken")
                return({
                url:'/orders/checkout',
                method:'POST',
                body:orderData,
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })}
        }),
          refund:builder.mutation<ApiResponse<MostEndpointsData>,FormData>({
            query:(refundBody)=>{
               
                return({
                url:'/orders/refund',
                method:'POST',
                body:refundBody,
            })}
        }),
            getShippingPrice:builder.query<shippingPrice,void>({
            query:()=>'/orders/shipping'
        }),
            confirmPayment:builder.mutation<confirmPayment,confirmPaymentData>({
                query:(paymentData)=>({
                url:'/orders/confirmPayment',
                method:"PUT",
                body:paymentData,
            })

        }),
            getPaymentInfo:builder.query<ApiResponse<PaymentInfoResponse>,string>({
                query:(id)=>({
                    url:`/orders/paymentInfo/${id}`,

                })
        }),
            getRepayment:builder.query<ApiResponse<PlacingOrderData>,GetRepaymentParams>({
                query:({id})=>({
                    url:`/orders/repayment`,
                    params:{id},
                })
        }),
            getCategoryProducts:builder.query<ProductsResponse,GetCategoryProductsParams>({
                query:({categoryName,color,size,sort,limit,offset,min_price,max_price})=>({
                    url:`/products/category/${categoryName}`,
                    params:{
                        ...(color && {color}),
                        ...(size && {size}),
                        ...(sort && {sort}),
                        ...(limit && {limit}),
                        ...(offset && {offset}),
                        ...(min_price && {min_price}),
                        ...(max_price && {max_price}),
                    }
                    

                })
        }),
            getMostVisited:builder.query<ProductsResponse,GetMostVisitedParams>({
                query:({limit})=>({
                    url:'/products/mostVisited',
                    params:{...(limit && {limit})},
                })
        }),
            getProduct:builder.query<ProductsResponse,GetProductParams>({
                query:({name})=>({
                    url:`/products/product/${name}`,
                })
        }), 
            getProducts:builder.query<ProductsResponse,GetCategoryProductsParams>({
                query:({color,size,sort,limit,offset,min_price,max_price})=>({
                    url:'/products/',
                    params:{
                        ...(color && {color}),
                        ...(size && {size}),
                        ...(sort && {sort}),
                        ...(limit && {limit}),
                        ...(offset && {offset}),
                        ...(min_price && {min_price}),
                        ...(max_price && {max_price}),
                    }
                })
        }),
            rating:builder.mutation<ApiResponse<ProductRating>,GetRatingParams>({
                query:({productName,rating})=>({
                    url:`/products/rate/${productName}`,
                    method:'PUT',
                    params:{rating},
                }),
        }),
           getRecommendations:builder.query<ProductsResponse,GetMostVisitedParams>({
            query:({limit})=>({
                url:'/products/recommendation',
                params:{...(limit && {limit})},

                }) 
        }),
            getSales:builder.query<ProductsResponse,GetSalesParams>({
                query:({color,size,sort,limit,offset,min_price,max_price,category,subcategory})=>({
                    url:'/products/sales',
                    params:{
                        ...(color && {color}),
                        ...(size && {size}),
                        ...(sort && {sort}),
                        ...(limit && {limit}),
                        ...(offset && {offset}),
                        ...(min_price && {min_price}),
                        ...(max_price && {max_price}),
                        ...(category && {category}),
                        ...(subcategory && {subcategory}),
                    }

                }),
        }),
            getSearchProducts:builder.query<ProductsResponse,GetSearchProductsParams>({
                query:({name,limit,offset})=>({
                    url:'/products/search',
                    params:{
                        name,
                        ...(limit && {limit}),
                        ...(offset && {offset}),
                    }
                })
        }),
            getSubcategoryProducts:builder.query<ProductsResponse,GetSubcategoryProductsParams>({
                query:({subcategoryName,color,size,sort,limit,offset,min_price,max_price})=>({
                    url:`/products/subcategory/${subcategoryName}`,
                    params:{
                        ...(color && {color}),
                        ...(size && {size}),
                        ...(sort && {sort}),
                        ...(limit && {limit}),
                        ...(offset && {offset}),
                        ...(min_price && {min_price}),
                        ...(max_price && {max_price}),
                    }
                })
        }),
            getCart:builder.query<ApiResponse<CartResponse>,GetCartParams>({
                query:({do:action,product,id})=>{
                    const token=localStorage.getItem("userToken");
                    switch (action) {
                        case'view':
                            return {
                                url:'/profile/cart',
                                method:'GET',
                                params:{do:action},
                                headers:{
                    "Authorization":`Bearer ${token}`
                      }
                    }
                        case 'add':
                            return {
                                url:'/profile/cart',
                                method:'POST',
                                params:{do:action},
                                body:product,
                                headers:{
                    "Authorization":`Bearer ${token}`
                    }

                } 
                  case 'remove':
                    return {
                        url:`/profile/cart`,
                        method:'GET',
                        params:{do:action,id},
                             headers:{
                    "Authorization":`Bearer ${token}`
                    }  
              }        
                 case 'update':
                    return {
                        url:`/profile/cart`,
                        method:'POST',
                        body:product,
                        params:{do:action,id},
                             headers:{
                    "Authorization":`Bearer ${token}`
                   }
            }  
            default:
                return {
                    url:'/profile/cart',
                    method:'GET',
                    params:{do:action},
                         headers:{
                    "Authorization":`Bearer ${token}`
                  }  
                }
             } 
            }       
                    
       }),

           getProfile:builder.query<ApiResponse<UserData>,void>({
            query:()=>{
                const token=localStorage.getItem("userToken");
                return({
                url:'/profile/',
                headers:{
                    "Authorization":`Bearer ${token}`
                }
             })

            },
            providesTags: ["profile"]
        }),
           updateInfo:builder.mutation<ApiResponse<UserData>,FormData>({
            query:(userData)=>{
                const token=localStorage.getItem("userToken");
                return({
                    url:"/profile/update",
                    method:'POST',
                    body:userData,
                    headers:{
                    "Authorization":`Bearer ${token}`
                }
                

                })
            },
            invalidatesTags:["profile"] 
        }),
            getUserOrders:builder.query<ApiResponse<OrdersData>,void>({
                query:()=>{
                   const token=localStorage.getItem("userToken");
                   return({
                    url:"/profile/orders",
                    headers:{
                    "Authorization":`Bearer ${token}`
                    }
                    
                   }) 
                },
                providesTags:["profile"]
            }),
              getWishList:builder.query<ApiResponse<WishlistResponse>&ApiResponse<WishlistActionResponse>,GetWishListParams>({
                query:({do:action,product})=>{
                    const token=localStorage.getItem("userToken");
                    switch (action) {
                        case'view':
                            return {
                                url:'/profile/wishlist',
                                method:'GET',
                                params:{do:action},
                                headers:{
                    "Authorization":`Bearer ${token}`
                      },
                    
                    }
                        case 'add':
                            return {
                                url:'/profile/wishlist',
                                method:'GET',
                                params:{do:action,product},
                                headers:{
                    "Authorization":`Bearer ${token}`
                    }

                } 
                  case 'remove':
                    return {
                        url:`/profile/wishlist`,
                        method:'GET',
                        params:{do:action,product},
                             headers:{
                    "Authorization":`Bearer ${token}`
                    }  
              }          
              default:
                return {
                    url:'/profile/wislList',
                    method:'GET',
                    params:{do:action},
                         headers:{
                    "Authorization":`Bearer ${token}`
                  }  
                }
             } 
            },
            
                  
                    
       }),
            

             
   

            
            


    }),
})

export const {
  useLazyGetCartQuery,
   useLazyGetWishListQuery,
    useRegisterMutation,
    useVerifyEmailMutation,
    useLogInMutation,
    useForgotPasswoedMutation,
    useResetPasswoedMutation,
    useLogOutMutation,
    useGetCarouselsQuery,
    useGetCategoriesQuery,
    useContactMutation,
    useGetCouponQuery,
    useCheckOutMutation,
    useRefundMutation,
    useGetShippingPriceQuery ,
    useConfirmPaymentMutation,
    useGetPaymentInfoQuery,
    useGetRepaymentQuery,
    useGetCategoryProductsQuery,
    useGetMostVisitedQuery,
    useGetProductQuery,
    useGetProductsQuery,
    useRatingMutation,
    useGetRecommendationsQuery,
    useGetSalesQuery,
    useGetSearchProductsQuery,
    useGetSubcategoryProductsQuery,
    useGetCartQuery,
    useGetProfileQuery,
    useUpdateInfoMutation,
    useGetUserOrdersQuery,
    useGetWishListQuery,
} = apiSlice;