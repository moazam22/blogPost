import { Collapse, Flex, Text, Divider } from "@chakra-ui/react";
import { PostComment } from "../../generated/graphql";
import ShowComment from "./Comment";

interface Props {
	showComments: boolean;
	blogId: string;
  postComments: PostComment[] | undefined | null;
	refetchPosts: ()=>void;
}

const CommentList: React.FC<Props> = ({ 
		showComments, 
		blogId, 
		postComments,
		refetchPosts, 
	}) => {

	return (
		<Collapse in={showComments} animateOpacity>
		{
			!!(Array.isArray(postComments)) && !!postComments?.length ? (
					<>
						<Text fontSize='14px' mb='0' mt='0' fontWeight='500'>Comments:</Text>
						<Divider mt='1px' mb='0' bg='grey' h='0.5px' />
						<Flex w='99%' borderRadius='8px' mt='5px' border='0.5px solid grey' mb='5px' flexDirection='column'>
							{
								postComments.map((comment: PostComment, index: number) => {
									return (
										<ShowComment 
											key={comment.id} 
											comment={comment} 
											hideDivider={postComments.length === index + 1} 
											postId={blogId}
											refetchPosts={ refetchPosts }
										/>
									)
								})
							}
						</Flex>
					</>
				)
				 : (postComments?.length === 0)
				? (
						<Flex mb='1em' w='100%' justifyContent='center' alignItems='center'>
						<div>{`No Comments`}</div>
						</Flex>
					)
				: null
		}
		</Collapse>
	)
}

export default CommentList;