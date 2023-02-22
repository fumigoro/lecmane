import { Class } from "../../types/global";
import { ClassListItem } from "./common/ClassListItem";

type Props = {
  classes: Class[];
}

export const ClassList = ({ classes }: Props) => {
  return (
    <>
      <div>{classes.length}</div>
      {classes.map((c, index) => (<ClassListItem key={index} classItem={c} />))}
    </>
  )
}