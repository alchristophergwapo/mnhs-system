import Paper from "@mui/material/Paper";
import { faker, type SexType } from "@faker-js/faker";
import Table from "@/src/components/Table";
import NameColumn from "./columns/NameColum";
import GenderColumn from "./columns/GenderColumn";
import ActionsColumn from "./columns/ActionsColumn";

type GradeVIIProps = {};

export type TeacherType = {
  id: string;
  avatar: string;
  birthday: Date;
  firstName: string;
  lastName: string;
  sex: SexType;
};

interface Teacher {
  id: string;
  avatar: string;
  birthday: Date;
  firstName: string;
  lastName: string;
  sex: SexType;
}

export function createRandomTeacher(): Teacher {
  return {
    id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    sex: faker.helpers.arrayElement(["female", "male"]),
  };
}

export default function GradeVII(props: GradeVIIProps) {
  const teachers = faker.helpers.multiple(createRandomTeacher, { count: 10 });

  return (
    <div className="w-full z-10 p-8">
      <Paper className="w-full mt-8 p-4 flex flex-col z-10 gap-6 bg-white min-h-40">
        <Table tableRows={teachers}>
          <NameColumn />
          <GenderColumn />
          <ActionsColumn />
        </Table>
      </Paper>
    </div>
  );
}
