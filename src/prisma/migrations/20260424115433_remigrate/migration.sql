-- AlterTable
CREATE SEQUENCE citizenship_id_seq;
ALTER TABLE "Citizenship" ALTER COLUMN "id" SET DEFAULT nextval('citizenship_id_seq');
ALTER SEQUENCE citizenship_id_seq OWNED BY "Citizenship"."id";

-- AlterTable
CREATE SEQUENCE postion_id_seq;
ALTER TABLE "Postion" ALTER COLUMN "id" SET DEFAULT nextval('postion_id_seq');
ALTER SEQUENCE postion_id_seq OWNED BY "Postion"."id";

-- AlterTable
CREATE SEQUENCE student_id_seq;
ALTER TABLE "Student" ALTER COLUMN "id" SET DEFAULT nextval('student_id_seq');
ALTER SEQUENCE student_id_seq OWNED BY "Student"."id";

-- AlterTable
CREATE SEQUENCE studentgrade_id_seq;
ALTER TABLE "StudentGrade" ALTER COLUMN "id" SET DEFAULT nextval('studentgrade_id_seq');
ALTER SEQUENCE studentgrade_id_seq OWNED BY "StudentGrade"."id";

-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";
