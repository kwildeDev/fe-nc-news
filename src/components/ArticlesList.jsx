import { useState, useEffect } from 'react';
import { getArticles } from '../api';
import { formatDate } from '../utils';
import { Link, useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Box, Card, FormControl, InputLabel, MenuItem, Select, Grid2, Skeleton, Stack, Button, CardActionArea, Typography, CardHeader, CardMedia, CardContent, CardActions, Chip, useTheme, Paper } from '@mui/material';
import { Comment, ThumbUp } from '@mui/icons-material';


const ArticlesList = () => {
    const { pathname } = useLocation()
    const [searchParams, setSearchParams] = useSearchParams();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    
    const topicSlug = pathname.startsWith("/topics/") ? pathname.slice(8) : undefined
    const [sortBy, setSortBy] = useState(searchParams.get("sort_by") || "created_at")
    const [orderBy, setOrderBy] = useState(searchParams.get("order") || "desc")
    const theme = useTheme();

    const handleSort = (event) => {
        event.preventDefault();
        const newSortBy = event.target.value;
        setSortBy(newSortBy);
        setSearchParams((current) => {
            current.set("sort_by", newSortBy);
            return current;
        });
    };

    const handleOrder = (event) => {
        event.preventDefault();
        const newOrderBy = event.target.value;
        setOrderBy(newOrderBy);
        setSearchParams((current) => {
            current.set("order", newOrderBy);
            return current;
        });
    };

    useEffect(() => {
        setIsLoading(true)
        const newSortBy = (searchParams.get("sort_by") || "created_at");
        const newOrderBy = (searchParams.get("order") || "desc");
        setSortBy(newSortBy)
        setOrderBy(newOrderBy)
        getArticles(topicSlug,newSortBy,newOrderBy)
        .then((articles) => {
            setArticles(articles)
            setIsLoading(false)
        })
        .catch((err) => {
            setIsError(true)
            setIsLoading(false)
        })
    },[topicSlug, searchParams])
    

    if (isError) {
        return <p>There was an error</p>
    }

    return (
        <Box component="section">
            <Box sx={{m: 1}}>
            <Typography variant="h6" component="h2" sx={{ textTransform: 'capitalize' }}>{topicSlug || "All topics"}</Typography>
            </Box>
            <Stack sx={{flexDirection: { xs: 'column', sm: 'row' }, justifyContent: "center", mb: 1}}>
            <FormControl sx={{ m: 1, width: { sm: "50%"} }}>
                <InputLabel id="select-sort-by-label">Sort by</InputLabel>
                    <Select labelId="select-sort-by-label" id="select-sort-by" onChange={handleSort} name="selectedQuery" value={sortBy}>
                        <MenuItem value={"created_at"}>Date</MenuItem>
                        <MenuItem value={"author"}>Author</MenuItem>
                        <MenuItem value={"title"}>Title</MenuItem>
                        <MenuItem value={"topic"} disabled={Boolean(topicSlug)}>Topic</MenuItem>
                        <MenuItem value={"votes"}>Most popular</MenuItem>
                        <MenuItem value={"comment_count"}>Most talked about</MenuItem>
                    </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: { sm: "50%"} }}>
                <InputLabel id="select-order-by-label">Order by</InputLabel>
                    <Select labelId="select-order-by-label" onChange={handleOrder} value={orderBy}>
                        <MenuItem value="desc">Descending</MenuItem>
                        <MenuItem value="asc">Ascending</MenuItem>
                    </Select>
            </FormControl>
            </Stack>
            <Grid2 container spacing={5} sx={{ justifyContent: 'center' }}>
                {articles.map((article) => {
                    return (
                    <Grid2 size={{xs: 12, sm: 6, md: 4}} key={article.article_id}>
                    <Card className="article-card" id="article-card" sx={{ maxWidth: 570, height: 530 }}>
                        <CardActionArea component={Link} to={`/articles/${article.article_id}`}>
                        <CardHeader
                            sx={{height: 80, alignItems: "flex-start"}}
                            titleTypographyProps={{variant: "h6", component: "h3"}}
                            title={
                                isLoading ? (
                                    <Skeleton animation="wave" height={20} width="80%" style={{ marginTop: 6, marginBottom: 14 }}/>
                                ) : (
                                article.title
                                )}
                            subheader={
                                isLoading ? (
                                    <Skeleton animation="wave" height={10} width="60%" style={{ marginBottom: 10 }}/>
                                ) : (    
                                `By ${article.author} on ${formatDate(article.created_at)}`
                                )}
                        />
                        {isLoading ? (
                            <Skeleton sx={{ height: 300}} animation="wave" variant="rectangular" />
                        ) : (
                        <CardMedia
                            component="img"
                            height="300"    
                            image={article.article_img_url || 'https://placehold.co/600x400/orange/white'}
                            alt="Article Image"
                            sx={{ objectFit: 'cover' }}
                        />
                        )}
                        <CardContent>
                        <Stack direction="row" spacing={3}>
                            {isLoading ? (
                                <Skeleton sx={{ borderRadius: 20}} animation="wave" variant="rectangular" height={33} width={54}/>
                            ) : (
                                <Chip icon={<ThumbUp />} label={article.votes}/>
                            )}
                            {isLoading ? (
                                <Skeleton sx={{ borderRadius: 20}} animation="wave" variant="rectangular" height={33} width={54}/>
                            ) : (
                                <Chip icon={<Comment />} label={article.comment_count}/>
                            )}
                        </Stack>
                        </CardContent>
                        </CardActionArea>
                        <CardActions>
                            {isLoading ? (
                                <Skeleton animation="wave" variant="rounded" height={38} width={96}/>
                            ) : (
                                <Button
                                    variant='contained'
                                    className={`topic__link topic__link--${article.topic}`}
                                    sx={{backgroundColor: theme.palette.secondary.main}}
                                    href={`/topics/${article.topic}`}>
                                        {article.topic}
                                </Button>
                            )}
                        </CardActions>
                    </Card>
                    
                    </Grid2>
                    );
                })}
            </Grid2>
        </Box>
  )
}

export default ArticlesList
