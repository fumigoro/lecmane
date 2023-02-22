import { Class } from "../../../types/global";

type Props = {
  classItem: Class;
}

export const ClassListItem = ({ classItem }: Props) => {
  return (
    <>
      <div>{classItem.title}{classItem.id}{classItem.year}</div>
    </>
  )
}
