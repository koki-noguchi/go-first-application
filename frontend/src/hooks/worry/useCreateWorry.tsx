import { FormEvent } from "react";
import { NewWorry, useCreateWorryMutation } from "../../generated/graphql";

export const useCreateWorry = () => {
    const [createWorry] = useCreateWorryMutation();

    const create = (props: NewWorry) => {
        const {title, notes} = props;
        createWorry({
            variables: {
                title: title,
                notes: notes
            }
        });
    }

    const handleSubmit = (props: NewWorry, e: FormEvent) => {
        e.preventDefault();
        create(props);
    }

    return {handleSubmit};
}
