import React from "react";

import {
    FormControl,
    Label,
    HelperMessage,
    ErrorMessage,
    Tag,
    Input,
    VStack,
    Checkbox,
} from "@yamada-ui/react";

//名前を入力
<VStack>
<FormControl
    label="user name"
    errorMessage
    optionalIndicator={
    <Tag size="sm" colorScheme="primary" ms={2}>
        requ1red
    </Tag>
    }
>
    <Input type="text" placeholder="名前を入力" />
</FormControl>

//支払いが発生した日付を入力
<FormControl
    label="日付"
    optionalIndicator={
        <Tag size="sm" colorScheme="primary" ms={2}>
        optional
        </Tag>
    }
>
    <Input type="date"/>
</FormControl>

<FormControl
    label="支払い金額"
    errorMessage="支払い金額を入力してください"
    optionalIndicator={
        <Tag size="sm" colorScheme="primary" ms={2}>
        required
        </Tag>
    }
    >
    <Input type="number" placeholder="支払い金額を入力" />
</FormControl>

<FormControl
    label="支払い方法"
    errorMessage="支払い方法を選択してください"
    optionalIndicator={
        <Tag size="sm" colorScheme="primary" ms={2}>
        required
        </Tag>
    }
    >
    <Input type="text" placeholder="支払い方法を入力" />
</FormControl>


</VStack>