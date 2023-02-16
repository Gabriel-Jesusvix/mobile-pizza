
export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Dashboard: undefined;
      Order: {
        number: number | string;
        order_id: string;
      },
      FinishedOrder: {
        order_id: string;
        number: number | string;

      };
    }
  }
}