import { FC, useEffect, useState } from 'react'
import styles from '../../styles/components/common/tag_filter.module.css'

interface TagFilterProps {
    tags: string[];
    valueUpdateEvent: (selected: string[]) => void;
}

const TagFilter: FC<TagFilterProps> = (props: TagFilterProps) => {
    const { tags, valueUpdateEvent } = props;
    const [selectedTags, setSelectedTags] = useState(new Array(tags.length).fill(false));

    const setSelectedTag = (tagIndex: number) => {
        setSelectedTags(selectedTags.map((isSelected: boolean, index: number) => index == tagIndex ? !isSelected : isSelected));
    };

    useEffect(() => {
        valueUpdateEvent(tags.filter((_, index) => selectedTags[index]));
    }, [selectedTags]);

    return (
        <div className={styles.container}>
            <span>Filter: </span>
            {
                tags.map((tag: string, index: number) => (
                    <button key={index} onClick={() => setSelectedTag(index)} className={`${styles.tag} ${selectedTags[index] ? styles.selected : ''}`}>
                        { tag }
                    </button>
                ))
            }
        </div>
    )
}

export default TagFilter
