/** @jsxImportSource @emotion/react */
import { FormControl, HStack, IconButton, Input, Tag } from "@yamada-ui/react";
import { useState, type FC } from "react";
import { FontAwesomeIcon } from "@yamada-ui/fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type User = {
  id: number;
  name: string;
  goodsIds: number[];
};

type AddUserFormProps = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const AddUserForm: FC<AddUserFormProps> = ({ users, setUsers }) => {
  const [userName, setUserName] = useState<string>("");
  const [isUserNameInvalid, setUserNameInvalid] = useState<boolean>(false);

  const addUser = (userName: string) => {
    const newUser: User = {
      id: Math.max(...users.map((item) => item.id)) + 1 || 1,
      name: userName,
      goodsIds: [],
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleUserAddSubmit = () => {
    let isValid = true;
    if (userName.length === 0) {
      isValid = false;
      setUserNameInvalid(true);
    }
		else setUserNameInvalid(false);
		console.log(isValid);
    if (isValid) {
      addUser(userName);
      setUserName("");
    }
		console.log(JSON.stringify(users, null, 2));
  };

  return (
    <HStack shadow="lg" p="lg" rounded="lg" alignItems="flex-start">
      <FormControl
        required
        invalid={isUserNameInvalid}
        errorMessage="ユーザー名は必須です"
        requiredIndicator={<Tag size="sm" colorScheme="red" ms={2}>required</Tag>}
      >
        <Input
          placeholder="ユーザー名"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </FormControl>
      <IconButton
        icon={<FontAwesomeIcon icon={faPlus} />}
				onClick={handleUserAddSubmit}
      />
    </HStack>
  );
};

export default AddUserForm;
