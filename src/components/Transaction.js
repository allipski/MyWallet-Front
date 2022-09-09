export default function Transaction({ date, description, value }) {
    return (
        <Wrapper>
            <Date>{date}</Date>
            <Description>{description}</Description>
            <Value>{value}</Value>
        </Wrapper>
    );
}