export interface Ombrello {
  id:number,
  bookedDates:BookDates[],
  prize:number,
  fila: number,
  totalPrize:number,
  backGroundColor: string,
  image: string
}

export interface BookDates {
  start: string,
  end: string
}
