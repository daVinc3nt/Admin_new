import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';

const CustomTimeline = ({ data }) => {
    let parsedData;

    try {
        parsedData = JSON.parse(data);
    } catch (error) {
        console.error('Error parsing data:', error);
        return null;
    }

    if (!Array.isArray(parsedData)) {
        console.error('Data is not an array');
        return null;
    }

    const sortedData = parsedData.reverse();

    return (
        <Timeline
            sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.2,
                },
            }}
        >
            {sortedData.map((item, index) => {
                let time2, message
                if (item.message.includes(': ')) {
                    [time2, message] = item.message.split(': ');
                } else {
                    message = item.message;
                }

                const [time, date] = item.time.split(' ');

                return (
                    <TimelineItem key={index}>
                        <TimelineOppositeContent>
                            <p className={`p-2 flex flex-col sm:gap-2 justify-end mb-4 ${index == 0 ? 'font-bold text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                                <span className="date whitespace-nowrap">{date}</span>
                                <span className="time">{time}</span>
                            </p>
                        </TimelineOppositeContent>
                        <TimelineSeparator className='mt-5'>
                            {index == 0 ? <MdRadioButtonChecked className='mb-2 text-blue-500 w-4 h-4' /> : <MdRadioButtonUnchecked className='mb-2 w-3.5 h-3.5 text-gray-400' />}
                            {index < sortedData.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>

                        <TimelineContent>
                            <p className={`border rounded p-2 flex flex-col mb-4  ${index == 0 ? 'font-medium text-black dark:text-white shadow-md' : 'text-gray-400 dark:text-gray-500 shadow'}`}>{message}</p>
                        </TimelineContent>
                    </TimelineItem>
                );
            })}
        </Timeline>
    );
};

export default CustomTimeline;
